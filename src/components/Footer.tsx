import { trip } from "@/data/trip";

export default function Footer() {
  return (
    <footer className="border-t border-border px-8 py-8 text-center text-[0.75rem] tracking-wide text-muted">
      {trip.footer}
    </footer>
  );
}
