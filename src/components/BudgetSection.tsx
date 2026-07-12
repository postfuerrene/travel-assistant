import { trip } from "@/data/trip";
import type { BudgetCard } from "@/data/trip";

const ACCENT_BORDER: Record<BudgetCard["accent"], string> = {
  rust: "border-l-rust",
  gold: "border-l-gold",
  sage: "border-l-sage",
  muted: "border-l-[#7a6e62]",
};

export default function BudgetSection() {
  return (
    <section
      id="budget"
      className="mx-auto w-full max-w-[860px] scroll-mt-16 border-b border-border bg-white px-6 py-8"
    >
      <div className="mb-5 flex items-center gap-3 font-serif text-lg font-bold">
        <span>💶 Kostenübersicht</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        {trip.budget.cards.map((card) => (
          <div
            key={card.label}
            className={`border border-l-3 border-border p-4 ${ACCENT_BORDER[card.accent]}`}
          >
            <div className="mb-2 text-[0.65rem] tracking-[0.15em] text-muted uppercase">
              {card.icon} {card.label}
            </div>
            <div className="flex flex-col gap-1">
              {card.rows.map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between text-[0.82rem]"
                >
                  <span>{r.label}</span>
                  <span className="font-medium">{r.value}</span>
                </div>
              ))}
              <div className="mt-1 flex justify-between border-t border-border pt-1 text-[0.82rem] font-medium">
                <span>{card.subtotalLabel}</span>
                <span>{card.subtotalValue}</span>
              </div>
            </div>
            {card.note && (
              <div className="mt-2 text-[0.7rem] text-muted italic">
                {card.note}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-baseline justify-between bg-ink px-4 py-3 text-cream">
        <div>
          <div className="text-[0.75rem] tracking-[0.12em] uppercase">
            {trip.budget.totalLabel}
          </div>
          <div className="mt-1 text-[0.7rem] text-cream/45">
            {trip.budget.totalNote}
          </div>
        </div>
        <div>
          <span className="font-serif text-2xl text-gold">
            {trip.budget.total}
          </span>
          <span className="ml-2 text-[0.72rem] text-cream/55">
            {trip.budget.totalPP}
          </span>
        </div>
      </div>
    </section>
  );
}
