import { trip } from "@/data/trip";

export default function Hero() {
  return (
    <>
      <header className="relative overflow-hidden bg-ink px-8 pt-14 pb-10 text-center text-cream">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(200,148,58,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(181,69,27,0.12)_0%,transparent_50%)]" />
        <div className="relative">
          <p className="mb-3 text-[0.7rem] tracking-[0.25em] text-gold uppercase">
            {trip.eyebrow}
          </p>
          <h1 className="font-serif text-[clamp(2rem,6vw,3.8rem)] leading-[1.15] font-normal">
            {trip.title.normal}
            <em className="text-gold italic">{trip.title.em}</em>
            {trip.title.rest}
          </h1>
          <p className="mt-4 text-sm tracking-wide text-cream/60">
            {trip.subtitle}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {trip.route.map((city, i) => (
              <span key={`${city}-${i}`} className="flex items-center gap-2">
                <span className="font-serif text-sm tracking-wide">{city}</span>
                {i < trip.route.length - 1 && (
                  <span className="text-xs text-rust">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
        {trip.overview.map((o) => (
          <div
            key={o.label}
            className="border-r border-border p-6 text-center last:border-r-0"
          >
            <div className="font-serif text-4xl text-rust">{o.num}</div>
            <div className="mt-1 text-[0.7rem] tracking-[0.15em] text-muted uppercase">
              {o.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
