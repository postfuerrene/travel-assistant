import { trip } from "@/data/trip";

export default function NavBar() {
  const links = [
    { href: "#budget", label: "Budget" },
    ...trip.cities.map((c) => ({ href: `#${c.id}`, label: c.name })),
    { href: "#tipps", label: "Tipps" },
  ];

  return (
    <nav className="sticky top-0 z-20 hidden justify-center gap-1 border-b border-line bg-cream/95 px-4 py-2.5 backdrop-blur md:flex">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-navy hover:text-white"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
