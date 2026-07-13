import { Bus, Euro, Info, Landmark, Sun, Ticket } from "lucide-react";
import { trip } from "@/data/trip";

const TIP_ICONS = [Euro, Ticket, Bus, Info, Landmark, Sun];

export default function TipsSection() {
  return (
    <div
      id="tipps"
      className="mt-6 scroll-mt-24 rounded-3xl bg-green px-5 py-7 text-navy sm:px-7"
    >
      <h3 className="mb-5 text-lg font-bold text-navy">
        Praktische Reisetipps
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {trip.tips.map((tip, i) => {
          const Icon = TIP_ICONS[i];
          return (
            <div key={tip.title} className="rounded-2xl bg-white/50 p-4">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-orange to-gold">
                <Icon
                  className="h-4 w-4 text-navy"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
              <strong className="mb-1 block text-xs font-semibold tracking-wide text-orange-deep uppercase">
                {tip.title}
              </strong>
              <p className="text-sm leading-relaxed text-navy/75">
                {tip.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
