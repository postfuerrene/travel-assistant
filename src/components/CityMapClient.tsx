"use client";

import dynamic from "next/dynamic";
import type { City } from "@/data/trip";

const CityMap = dynamic(() => import("./CityMap"), {
  ssr: false,
  loading: () => (
    <div className="mb-6 flex h-[340px] items-center justify-center border border-border bg-white text-sm text-muted">
      Karte wird geladen…
    </div>
  ),
});

export default function CityMapClient({ city }: { city: City }) {
  return <CityMap city={city} />;
}
