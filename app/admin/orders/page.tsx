import { Metadata } from "next";
import { getOrders } from "@/lib/db";
import { OrderTable } from "@/components/admin/OrderTable";

export const metadata: Metadata = {
  title: "Orders Management — KAPDE CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 block mb-1">
          Concierge Orders
        </span>
        <h1 className="text-3xl font-serif text-black">
          Order Requests
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review WhatsApp order inquiries, customer contact details, and execute atomic stock confirmation.
        </p>
      </div>

      <OrderTable initialOrders={orders} />
    </div>
  );
}
