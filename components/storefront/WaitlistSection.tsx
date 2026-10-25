"use client";

import { useState } from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";

export function StorefrontWaitlistSection() {
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState("Next Drop");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim()) return;

    setLoading(true);
    setError("");

    const isEmail = contact.includes("@");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: isEmail ? contact.trim() : undefined,
          phone: !isEmail ? contact.trim() : undefined,
          productInterest: interest,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to join waitlist. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="waitlist" className="bg-black text-white py-20 sm:py-24 border-b border-gray-900">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-400 block">
          Private Access
        </span>

        <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Join the Priority Drop Roster
        </h2>

        <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto">
          Our production is limited to strictly capped artisanal batch runs. Register to receive private 2-hour early access and lookbook preview before public drop.
        </p>

        {submitted ? (
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-sm inline-flex items-center space-x-3 text-white">
            <Check size={18} className="text-green-400" />
            <span className="text-xs font-semibold tracking-wider uppercase">
              You are on the priority roster. We will notify you before Drop 02.
            </span>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="max-w-md mx-auto space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Email address or WhatsApp phone"
                className="flex-1 h-12 px-4 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs rounded-sm outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-12 px-6 bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-[0.1em] uppercase rounded-sm transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin text-black" />
                ) : (
                  <>
                    <span>Request Access</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <p className="text-[10px] text-neutral-500 tracking-wide uppercase">
              Zero marketing spam. Only drop timing notifications and private links.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
