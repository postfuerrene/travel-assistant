import { trip } from "@/data/trip";

export default function Footer() {
  return (
    <footer className="px-8 py-8 text-center text-xs tracking-wide text-ink-soft">
      {trip.footer}
    </footer>
  );
}
