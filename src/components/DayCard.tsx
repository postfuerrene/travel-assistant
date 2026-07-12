import type { DayEntry, DayTag } from "@/data/trip";

function tagClass(variant?: DayTag["variant"]) {
  const base = "rounded-sm border px-2 py-0.5 text-[0.7rem]";
  if (variant === "highlight") return `${base} border-sage bg-sage text-white`;
  if (variant === "family") return `${base} border-gold bg-gold text-white`;
  return `${base} border-border text-muted`;
}

export default function DayCard({ entry }: { entry: DayEntry }) {
  const dateObj = new Date(`${entry.date}T00:00:00`);
  const dayNum = dateObj.getDate();
  const monthName = dateObj.toLocaleDateString("de-DE", { month: "long" });

  return (
    <div className="mb-5 grid grid-cols-[60px_1fr] gap-4 border border-l-3 border-border border-l-rust bg-white p-5 transition-colors hover:border-l-gold">
      <div className="pt-1 text-center">
        <div className="font-serif text-2xl leading-none text-rust">
          {entry.day}
        </div>
        <div className="text-[0.6rem] tracking-[0.12em] text-muted uppercase">
          Tag
        </div>
      </div>
      <div>
        <h3 className="mb-2 font-serif text-base font-bold">
          {entry.weekdayShort}, {dayNum}. {monthName} — {entry.title}
        </h3>
        <p className="text-[0.88rem] leading-relaxed text-[#3a3530]">
          {entry.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {entry.tags.map((t) => (
            <span key={t.text} className={tagClass(t.variant)}>
              {t.text}
            </span>
          ))}
        </div>
        {entry.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5 border-t border-dashed border-border pt-2">
            {entry.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm border border-rust px-2 py-0.5 text-[0.7rem] text-rust transition-colors hover:bg-rust hover:text-white"
              >
                🌐 {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
