import { trip } from "@/data/trip";

export default function TipsSection() {
  return (
    <div
      id="tipps"
      className="mt-12 scroll-mt-16 bg-ink px-7 py-8 text-cream"
    >
      <h3 className="mb-5 font-serif text-xl tracking-wide text-gold">
        ✦ Praktische Reisetipps
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trip.tips.map((tip) => (
          <div key={tip.title} className="border border-cream/15 p-3">
            <div className="mb-1 text-xl">{tip.icon}</div>
            <strong className="mb-1 block text-[0.75rem] tracking-[0.1em] text-gold uppercase">
              {tip.title}
            </strong>
            <p className="text-[0.82rem] leading-relaxed text-cream/75">
              {tip.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
