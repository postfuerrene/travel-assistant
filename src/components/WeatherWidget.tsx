"use client";

import { useEffect, useState } from "react";
import type { Coord } from "@/data/trip";

type WeatherState =
  | { status: "loading" }
  | { status: "unavailable" }
  | { status: "error" }
  | {
      status: "ok";
      days: {
        date: string;
        tMax: number;
        tMin: number;
        precipProb: number;
        code: number;
      }[];
    };

const WMO_ICON: Record<number, string> = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌦️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  71: "🌨️",
  73: "🌨️",
  75: "🌨️",
  80: "🌦️",
  81: "🌧️",
  82: "⛈️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

export default function WeatherWidget({
  coord,
  dates,
}: {
  coord: Coord;
  dates: string[];
}) {
  const [state, setState] = useState<WeatherState>({ status: "loading" });
  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coord.lat}&longitude=${coord.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${startDate}&end_date=${endDate}`;
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok || json.error || !json.daily?.time?.length) {
          if (!cancelled) setState({ status: "unavailable" });
          return;
        }
        const days = json.daily.time.map((d: string, i: number) => ({
          date: d,
          tMax: Math.round(json.daily.temperature_2m_max[i]),
          tMin: Math.round(json.daily.temperature_2m_min[i]),
          precipProb: json.daily.precipitation_probability_max[i],
          code: json.daily.weathercode[i],
        }));
        if (!cancelled) setState({ status: "ok", days });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [coord.lat, coord.lon, startDate, endDate]);

  if (state.status === "loading") {
    return (
      <div className="text-[0.75rem] text-muted">Wetter wird geladen…</div>
    );
  }
  if (state.status === "unavailable") {
    return (
      <div className="text-[0.75rem] text-muted">
        Vorhersage ist erst ca. 16 Tage vor Reisebeginn verfügbar.
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className="text-[0.75rem] text-muted">
        Wetterdaten aktuell nicht abrufbar.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {state.days.map((d) => (
        <div
          key={d.date}
          className="flex min-w-[68px] flex-col items-center gap-0.5 border border-border bg-white px-2 py-1.5 text-center"
        >
          <span className="text-[0.65rem] text-muted">
            {new Date(`${d.date}T00:00:00`).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
            })}
          </span>
          <span className="text-lg">{WMO_ICON[d.code] ?? "🌡️"}</span>
          <span className="text-[0.72rem] font-medium">
            {d.tMax}° / {d.tMin}°
          </span>
          {d.precipProb > 30 && (
            <span className="text-[0.62rem] text-sage">
              💧{d.precipProb}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
