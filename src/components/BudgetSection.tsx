import { BedDouble, Bus, Utensils, Wallet, Ticket } from "lucide-react";
import { trip } from "@/data/trip";
import type { BudgetCard } from "@/data/trip";
import ExpenseTracker from "./ExpenseTracker";

const CARD_ICON = [BedDouble, Utensils, Ticket, Bus];

const ACCENT: Record<BudgetCard["accent"], string> = {
  rust: "bg-orange/10 text-orange-deep",
  gold: "bg-gold/20 text-navy",
  sage: "bg-blue-soft text-blue-deep",
  muted: "bg-navy/5 text-navy",
};

export default function BudgetSection() {
  return (
    <section
      id="budget"
      className="mx-auto mt-8 w-full max-w-[860px] scroll-mt-24 px-5 pb-8 sm:px-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
          <Wallet className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h2 className="text-lg font-bold text-navy">Kostenübersicht</h2>
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        {trip.budget.cards.map((card, i) => {
          const Icon = CARD_ICON[i];
          return (
            <div
              key={card.label}
              className="rounded-2xl bg-white p-4 shadow-[0_1px_3px_rgba(16,25,58,0.08)]"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${ACCENT[card.accent]}`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="text-[0.72rem] font-semibold tracking-wide text-ink-soft uppercase">
                  {card.label}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {card.rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between gap-3 text-sm"
                  >
                    <span className="text-ink-soft">{r.label}</span>
                    <span className="font-semibold whitespace-nowrap text-ink">
                      {r.value}
                    </span>
                  </div>
                ))}
                <div className="mt-1 flex justify-between border-t border-line pt-1.5 text-sm font-bold text-navy">
                  <span>{card.subtotalLabel}</span>
                  <span>{card.subtotalValue}</span>
                </div>
              </div>
              {card.note && (
                <div className="mt-2 text-xs text-ink-soft italic">
                  {card.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-navy px-5 py-4 text-white">
        <div>
          <div className="text-xs font-semibold tracking-wide uppercase">
            {trip.budget.totalLabel}
          </div>
          <div className="mt-1 text-xs text-white/45">
            {trip.budget.totalNote}
          </div>
        </div>
        <div>
          <span className="bg-linear-to-r from-orange to-gold bg-clip-text text-2xl font-extrabold text-transparent">
            {trip.budget.total}
          </span>
          <span className="ml-2 text-xs text-white/55">
            {trip.budget.totalPP}
          </span>
        </div>
      </div>
      <ExpenseTracker estimateEUR={trip.budget.totalEUR} />
    </section>
  );
}
