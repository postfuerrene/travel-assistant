"use client";

import { useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Sun,
  type LucideIcon,
} from "lucide-react";
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

function weatherIcon(code: number): LucideIcon {
  if (code === 0) return Sun;
  if (code === 1 || code === 2) return CloudSun;
  if (code === 3) return Cloud;
  if (code === 45 || code === 48) return CloudFog;
  if ([51, 53, 55].includes(code)) return CloudDrizzle;
  if ([61, 63, 65, 80, 81].includes(code)) return CloudRain;
  if ([71, 73, 75].includes(code)) return CloudSnow;
  if ([82, 95, 96, 99].includes(code)) return CloudLightning;
  return Cloud;
}

function weatherLabel(code: number): string {
  if (code === 0) return "Sonnig";
  if (code === 1 || code === 2) return "Leicht bewölkt";
  if (code === 3) return "Bewölkt";
  if (code === 45 || code === 48) return "Neblig";
  if ([51, 53, 55].includes(code)) return "Nieselregen";
  if ([61, 63, 65, 80, 81].includes(code)) return "Regen";
  if ([71, 73, 75].includes(code)) return "Schnee";
  if ([82, 95, 96, 99].includes(code)) return "Gewitter";
  return "Bewölkt";
}

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
    return <div className="text-sm text-ink-soft">Wetter wird geladen…</div>;
  }
  if (state.status === "unavailable") {
    return (
      <div className="rounded-xl bg-blue-soft px-3 py-2 text-sm text-navy">
        Vorhersage ist erst ca. 16 Tage vor Reisebeginn verfügbar.
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className="text-sm text-ink-soft">
        Wetterdaten aktuell nicht abrufbar.
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {state.days.map((d) => {
        const Icon = weatherIcon(d.code);
        return (
          <div
            key={d.date}
            className="flex min-w-[76px] flex-col items-center gap-1 rounded-2xl bg-white px-3 py-2.5 text-center shadow-float-sm"
          >
            <span className="text-[0.68rem] font-medium text-ink-soft">
              {new Date(`${d.date}T00:00:00`).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
              })}
            </span>
            <Icon
              className="h-5 w-5 text-blue"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="sr-only">{weatherLabel(d.code)}</span>
            <span className="text-sm font-bold text-navy">
              {d.tMax}° / {d.tMin}°
            </span>
            {d.precipProb > 30 && (
              <span className="flex items-center gap-0.5 text-[0.65rem] text-blue-deep">
                <Droplets className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                {d.precipProb}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
