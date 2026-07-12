import type { City } from "@/data/trip";

export default function CityHeader({ city }: { city: City }) {
  return (
    <div className="mb-6 flex flex-wrap items-end gap-4 border-b-2 border-ink pb-3">
      <div className="font-serif text-5xl leading-none font-bold text-border">
        {city.number}
      </div>
      <div className="min-w-[200px] flex-1">
        <h2 className="font-serif text-2xl">
          {city.name}{" "}
          {city.nativeName && (
            <em className="text-base text-muted italic">
              ({city.nativeName})
            </em>
          )}
          <span className="ml-2 inline-block rounded-sm bg-rust px-2 py-0.5 align-middle text-[0.65rem] tracking-[0.15em] text-cream uppercase">
            {city.nights} Nächte
          </span>
        </h2>
        <div className="mt-1 text-[0.78rem] text-muted">{city.region}</div>
        <div className="mt-1 text-[0.78rem] text-sage">
          🏨 {city.hotel.name} · {city.hotel.price}
          {city.hotel.confirmed ? " · ✅ Bestätigt" : ""} (
          {city.hotel.dateRange})
        </div>
      </div>
      <div className="pb-1 text-right text-[0.75rem] whitespace-nowrap text-muted">
        <span className="block text-base font-medium text-gold">
          {city.driveFrom.time}
        </span>
        ab {city.driveFrom.from}
      </div>
    </div>
  );
}
