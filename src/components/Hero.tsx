import { CalendarDays, Globe2, MapPinned, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { trip } from "@/data/trip";

const OVERVIEW_ICONS = [CalendarDays, MapPinned, Globe2, Sparkles];

export default function Hero() {
  return (
    <>
      <header
        id="top"
        className="relative overflow-hidden bg-green px-5 pt-6 pb-8 text-navy sm:px-8 sm:pt-10 sm:pb-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,0.5)_0%,transparent_55%),radial-gradient(ellipse_at_85%_30%,rgba(240,193,105,0.3)_0%,transparent_50%)]" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-2">
            <Logo className="h-8 w-8 shrink-0" />
            <span className="text-sm font-semibold tracking-wide text-navy/70">
              {trip.eyebrow}
            </span>
          </div>
          <h1 className="text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">
            {trip.title.normal}
            <span className="text-orange-deep">{trip.title.em}</span>
            {trip.title.rest}
          </h1>
          <p className="mt-3 max-w-md text-sm text-navy/70 sm:text-base">
            {trip.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
            {trip.route.map((city, i) => (
              <span key={`${city}-${i}`} className="flex items-center gap-2">
                <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-medium sm:text-sm">
                  {city}
                </span>
                {i < trip.route.length - 1 && (
                  <span className="text-xs text-orange-deep">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 px-5 py-5 sm:grid-cols-4 sm:px-8">
        {trip.overview.map((o, i) => {
          const Icon = OVERVIEW_ICONS[i];
          return (
            <div
              key={o.label}
              className="flex flex-col gap-2 rounded-2xl bg-white/85 p-4 shadow-float backdrop-blur-sm"
            >
              <Icon
                className="h-5 w-5 text-green-deep"
                strokeWidth={2}
                aria-hidden="true"
              />
              <div className="text-2xl font-extrabold text-navy">{o.num}</div>
              <div className="text-[0.7rem] font-medium tracking-wide text-ink-soft uppercase">
                {o.label}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
