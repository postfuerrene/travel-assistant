import { Car } from "lucide-react";

export default function Divider({ text }: { text: string }) {
  return (
    <div className="my-6 flex items-center gap-3 text-xs font-medium text-ink-soft">
      <span className="h-px flex-1 bg-line" />
      <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 shadow-float-sm">
        <Car className="h-3.5 w-3.5 text-blue" strokeWidth={2.5} aria-hidden="true" />
        {text}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
