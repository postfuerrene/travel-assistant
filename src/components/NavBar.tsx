import { trip } from "@/data/trip";

export default function NavBar() {
  const links = [
    { href: "#budget", label: "Budget" },
    ...trip.cities.map((c) => ({ href: `#${c.id}`, label: c.name })),
    { href: "#tipps", label: "Tipps" },
  ];

  return (
    <nav className="sticky top-0 z-20 flex flex-wrap justify-center gap-1 border-b border-border bg-cream/95 px-4 py-2 backdrop-blur">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="rounded-sm px-3 py-1 text-[0.72rem] tracking-[0.1em] text-muted uppercase transition-colors hover:bg-ink hover:text-cream"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
