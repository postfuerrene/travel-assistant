"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lightbulb, Wallet } from "lucide-react";
import { trip } from "@/data/trip";

type FlatDay = {
  id: string;
  chipId: string;
  day: number;
  date: string;
  weekdayShort: string;
};

export default function DayNav() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const days: FlatDay[] = useMemo(
    () =>
      trip.cities.flatMap((city) =>
        city.days.map((d) => ({
          id: `day-${d.day}`,
          chipId: `chip-${d.day}`,
          day: d.day,
          date: d.date,
          weekdayShort: d.weekdayShort,
        }))
      ),
    []
  );

  const todayISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    const elements = days
      .map((d) => document.getElementById(d.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const match = days.find((d) => d.id === visible[0].target.id);
          if (match) setActiveDay(match.day);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [days]);

  useEffect(() => {
    const target =
      days.find((d) => d.date === todayISO) ??
      days.find((d) => d.date > todayISO) ??
      days[days.length - 1];
    if (!target || !scrollerRef.current) return;
    const chipEl = document.getElementById(target.chipId);
    if (!chipEl) return;
    const container = scrollerRef.current;
    const offset =
      chipEl.offsetLeft - container.clientWidth / 2 + chipEl.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, offset), behavior: "auto" });
  }, [days, todayISO]);

  return (
    <div className="safe-top sticky top-0 z-30 flex items-center gap-2 border-b border-line bg-white/95 px-3 py-2 backdrop-blur">
      <a
        href="#budget"
        aria-label="Zum Budget springen"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-navy transition active:scale-90 hover:bg-blue-soft"
      >
        <Wallet className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" />
      </a>
      <div
        ref={scrollerRef}
        className="no-scrollbar flex flex-1 gap-2 overflow-x-auto scroll-smooth"
      >
        {days.map((d) => {
          const dateObj = new Date(`${d.date}T00:00:00`);
          const dayNum = dateObj.getDate();
          const isPast = d.date < todayISO;
          const isToday = d.date === todayISO;
          const isActive = activeDay === d.day;

          let classes =
            "flex min-h-11 min-w-11 shrink-0 flex-col items-center justify-center rounded-xl px-2.5 transition active:scale-90 ";
          if (isActive) {
            classes += "bg-navy text-white";
          } else if (isToday) {
            classes += "bg-orange text-navy";
          } else if (isPast) {
            classes += "bg-cream text-ink-soft/40";
          } else {
            classes += "bg-cream text-ink-soft";
          }

          return (
            <a key={d.id} id={d.chipId} href={`#${d.id}`} className={classes}>
              <span className="text-[0.58rem] font-semibold tracking-wide uppercase">
                {d.weekdayShort}
              </span>
              <span className="text-sm leading-none font-bold">{dayNum}.</span>
            </a>
          );
        })}
      </div>
      <a
        href="#tipps"
        aria-label="Zu den Tipps springen"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-navy transition active:scale-90 hover:bg-blue-soft"
      >
        <Lightbulb className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  );
}
