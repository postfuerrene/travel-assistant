import { CloudSun } from "lucide-react";
import CityHeader from "./CityHeader";
import CityMapClient from "./CityMapClient";
import WetterComWidget from "./WetterComWidget";
import DayCard from "./DayCard";
import type { City } from "@/data/trip";

export default function CitySection({ city }: { city: City }) {
  return (
    <section id={city.id} className="mt-10 scroll-mt-24 animate-fade-up">
      <CityHeader city={city} />
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-soft uppercase">
          <CloudSun
            className="h-3.5 w-3.5"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          Wetter
        </div>
        <WetterComWidget
          widgetId={city.weatherWidget.id}
          location={city.weatherWidget.location}
          cityLabel={city.name}
          pageUrl={city.weatherUrl}
        />
      </div>
      <CityMapClient city={city} />
      {city.days.map((day) => (
        <DayCard key={day.day} entry={day} />
      ))}
    </section>
  );
}
