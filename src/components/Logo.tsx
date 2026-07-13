export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#16261D" />
          <stop offset="100%" stopColor="#A85A2E" />
        </linearGradient>
      </defs>
      <path
        d="M10,50 Q25,20 50,50 Q75,20 90,50 Q75,80 50,50 Q25,80 10,50 Z"
        stroke="url(#logo-gradient)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
