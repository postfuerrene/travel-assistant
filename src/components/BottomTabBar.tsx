"use client";

import { useEffect, useState } from "react";
import { Home, Lightbulb } from "lucide-react";
import { trip } from "@/data/trip";

const SECTION_IDS = ["top", ...trip.cities.map((c) => c.id), "tipps"];

export default function BottomTabBar() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      id: "top",
      label: "Start",
      node: <Home className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
    },
    ...trip.cities.map((c) => ({
      id: c.id,
      label: c.name,
      node: (
        <span
          aria-hidden="true"
          className="text-[0.7rem] leading-none font-bold"
        >
          {c.number}
        </span>
      ),
    })),
    {
      id: "tipps",
      label: "Tipps",
      node: <Lightbulb className="h-5 w-5" strokeWidth={2} aria-hidden="true" />,
    },
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)" }}
    >
      <nav className="glass shadow-float flex items-center gap-1 rounded-[28px] px-2 py-1.5">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex min-h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-[20px] py-2 transition active:scale-90 ${
                isActive ? "bg-green-soft" : ""
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center ${
                  isActive ? "text-green-deep" : "text-ink-soft"
                }`}
              >
                {item.node}
              </span>
              <span
                className={`text-[0.62rem] font-medium ${
                  isActive ? "text-green-deep" : "text-ink-soft"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
