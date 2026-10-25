import { ProductStatus, OrderStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ProductStatus | OrderStatus | string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  published: { label: "LIVE", className: "bg-green-50 text-green-700 border-green-200" },
  draft: { label: "DRAFT", className: "bg-neutral-100 text-neutral-600 border-neutral-200" },
  sold_out: { label: "SOLD OUT", className: "bg-amber-50 text-amber-700 border-amber-200" },
  archived: { label: "ARCHIVED", className: "bg-neutral-100 text-neutral-400 border-neutral-200" },
  pending: { label: "PENDING", className: "bg-amber-50 text-amber-800 border-amber-200" },
  confirmed: { label: "CONFIRMED", className: "bg-green-50 text-green-800 border-green-200" },
  cancelled: { label: "CANCELLED", className: "bg-red-50 text-red-700 border-red-200" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: status.toUpperCase(),
    className: "bg-neutral-100 text-neutral-600 border-neutral-200",
  };

  return (
    <span
      className={`inline-flex items-center text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-xs border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
