import { CloudSun } from "lucide-react";
import CityHeader from "./CityHeader";
import CityMapClient from "./CityMapClient";
import WeatherWidget from "./WeatherWidget";
import DayCard from "./DayCard";
import type { City } from "@/data/trip";

export default function CitySection({ city }: { city: City }) {
  const dates = city.days.map((d) => d.date);

  return (
    <section id={city.id} className="mt-10 scroll-mt-16 animate-fade-up">
      <CityHeader city={city} />
      <div className="mb-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-soft uppercase">
          <CloudSun className="h-3.5 w-3.5" strokeWidth={2.5} />
          Wetter
        </div>
        <WeatherWidget coord={city.coord} dates={dates} />
      </div>
      <CityMapClient city={city} />
      {city.days.map((day) => (
        <DayCard key={day.day} entry={day} />
      ))}
    </section>
  );
}
