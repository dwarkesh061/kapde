import { Metadata } from "next";
import { getWaitlistEntries } from "@/lib/db";
import { WaitlistTable } from "@/components/admin/WaitlistTable";

export const metadata: Metadata = {
  title: "Waitlist — KAPDE CMS",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminWaitlistPage() {
  const entries = await getWaitlistEntries();

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 block mb-1">
          Audience & Drops
        </span>
        <h1 className="text-3xl font-serif text-black">
          Priority Drop Roster
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Direct subscriber contacts registered for early access to Drop 02 and restocks.
        </p>
      </div>

      <WaitlistTable initialEntries={entries} />
    </div>
  );
}
