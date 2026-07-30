import Image from "next/image";
import Logo from "./Logo";
import { trip } from "@/data/trip";

export default function Hero() {
  return (
    <header
      id="top"
      className="relative min-h-[320px] overflow-hidden px-5 pt-6 pb-8 text-white sm:min-h-[420px] sm:px-8 sm:pt-10 sm:pb-12"
    >
      <Image
        src="/images/karlsbad/hero-teplakanal.jpg"
        alt="Die Teplá mit ihren Kolonnaden, dahinter die bewaldeten Hügel um Karlsbad"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/45 to-navy/75" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-2">
          <Logo className="h-8 w-8 shrink-0" />
          <span className="text-sm font-semibold tracking-wide text-white/80">
            {trip.eyebrow}
          </span>
        </div>
        <h1 className="text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">
          {trip.title.normal}
          <span className="text-gold">{trip.title.em}</span>
          {trip.title.rest}
        </h1>
        <p className="mt-3 max-w-md text-sm text-white/75 sm:text-base">
          {trip.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1">
          {trip.route.map((city, i) => (
            <span key={`${city}-${i}`} className="flex items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium sm:text-sm">
                {city}
              </span>
              {i < trip.route.length - 1 && (
                <span className="text-xs text-gold">→</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
