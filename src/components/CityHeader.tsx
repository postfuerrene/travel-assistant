import { BedDouble, Car } from "lucide-react";
import type { City } from "@/data/trip";

export default function CityHeader({ city }: { city: City }) {
  return (
    <div className="mb-5 overflow-hidden rounded-3xl bg-linear-to-br from-green to-green-soft text-navy">
      <div className="relative px-5 py-6 sm:px-7 sm:py-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(255,255,255,0.5)_0%,transparent_55%)]" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-1 text-xs font-semibold tracking-wide text-navy/60 uppercase">
              {city.region}
            </div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {city.name}{" "}
              {city.nativeName && (
                <span className="text-lg font-medium text-navy/60">
                  ({city.nativeName})
                </span>
              )}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-semibold">
                {city.nights} Nächte
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold">
                <Car className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                {city.driveFrom.time} ab {city.driveFrom.from}
              </span>
            </div>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-orange to-gold text-sm font-extrabold text-navy">
            {city.number}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2.5 border-t border-navy/10 bg-white/40 px-5 py-3 sm:px-7">
        <BedDouble
          className="h-4 w-4 shrink-0 text-orange-deep"
          strokeWidth={2}
          aria-hidden="true"
        />
        <span className="text-sm text-navy/85">
          {city.hotel.name} · {city.hotel.price}
          {city.hotel.confirmed ? " · Bestätigt" : ""} ({city.hotel.dateRange})
        </span>
      </div>
    </div>
  );
}
