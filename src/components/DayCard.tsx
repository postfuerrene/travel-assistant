import { ExternalLink } from "lucide-react";
import type { DayEntry, DayTag } from "@/data/trip";

function tagClass(variant?: DayTag["variant"]) {
  const base = "rounded-full px-2.5 py-1 text-xs font-medium";
  if (variant === "highlight") return `${base} bg-blue text-white`;
  if (variant === "family") return `${base} bg-orange text-white`;
  return `${base} bg-cream text-ink-soft`;
}

export default function DayCard({ entry }: { entry: DayEntry }) {
  const dateObj = new Date(`${entry.date}T00:00:00`);
  const dayNum = dateObj.getDate();
  const monthName = dateObj.toLocaleDateString("de-DE", { month: "long" });

  return (
    <div
      id={`day-${entry.day}`}
      className="mb-4 scroll-mt-24 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,25,58,0.08)]"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-blue to-navy-light leading-none text-white">
          <span className="text-base font-extrabold">{entry.day}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 text-xs font-semibold text-blue">
            {entry.weekdayShort}, {dayNum}. {monthName}
          </div>
          <h3 className="mb-2 text-base font-bold text-navy">
            {entry.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">
            {entry.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.tags.map((t) => (
              <span key={t.text} className={tagClass(t.variant)}>
                {t.text}
              </span>
            ))}
          </div>
          {entry.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
              {entry.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs font-medium text-navy transition-colors hover:bg-cream"
                >
                  <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
