import { NextRequest, NextResponse } from "next/server";
import { createOrderRequest } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`checkout_${ip}`, {
      intervalMs: 15 * 60 * 1000,
      maxRequests: 20,
    });

    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many checkout attempts. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { customerName, customerPhone, city, address, note, items, total } = body;

    if (!customerName || !customerPhone || !city || !address) {
      return NextResponse.json(
        { error: "Customer name, WhatsApp contact, city, and delivery address are required." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Your bag is currently empty." },
        { status: 400 }
      );
    }

    // 1. Record the order request in the database
    const result = await createOrderRequest({
      customerName,
      customerPhone,
      city,
      address,
      note,
      items,
      total,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to log order request." },
        { status: 500 }
      );
    }

    // 2. Generate structured WhatsApp Concierge message
    const orderId = result.orderId;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

    const itemLines = items
      .map(
        (item: any, idx: number) =>
          `${idx + 1}. *${item.productName}*\n   Color: ${item.variantColor}\n   Size: ${item.size}\n   Quantity: ${item.quantity}\n   Price: ₹${item.price * item.quantity}`
      )
      .join("\n\n");

    const message = [
      "Hello KAPDE Concierge 👋",
      "",
      "I would like to place an order from your collection:",
      "",
      `*Order ID: ${orderId}*`,
      "",
      itemLines,
      "",
      `*Total Amount: ₹${total}*`,
      "",
      `*Customer Name:* ${customerName}`,
      `*WhatsApp Phone:* ${customerPhone}`,
      `*Delivery City:* ${city}`,
      `*Shipping Address:* ${address}`,
      note ? `*Special Request:* ${note}` : "",
      "",
      "Please confirm garment availability and share payment details (UPI/NetBanking/COD). Thank you!",
    ]
      .filter((line) => line !== "")
      .join("\n");

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return NextResponse.json({
      success: true,
      orderId,
      whatsappUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
