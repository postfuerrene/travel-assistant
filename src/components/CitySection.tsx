import CityHeader from "./CityHeader";
import CityMapClient from "./CityMapClient";
import WeatherWidget from "./WeatherWidget";
import DayCard from "./DayCard";
import type { City } from "@/data/trip";

export default function CitySection({ city }: { city: City }) {
  const dates = city.days.map((d) => d.date);

  return (
    <section id={city.id} className="mt-12 scroll-mt-16 animate-fade-up">
      <CityHeader city={city} />
      <div className="mb-4">
        <div className="mb-2 text-[0.68rem] tracking-[0.15em] text-muted uppercase">
          🌤️ Wetter
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
