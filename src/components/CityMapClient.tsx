"use client";

import dynamic from "next/dynamic";
import type { City } from "@/data/trip";

const CityMap = dynamic(() => import("./CityMap"), {
  ssr: false,
  loading: () => (
    <div className="shadow-float mb-5 flex h-[300px] items-center justify-center rounded-3xl bg-white/90 text-sm text-ink-soft backdrop-blur-sm">
      Karte wird geladen…
    </div>
  ),
});

export default function CityMapClient({ city }: { city: City }) {
  return <CityMap city={city} />;
}
