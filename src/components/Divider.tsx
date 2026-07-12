export default function Divider({ text }: { text: string }) {
  return (
    <div className="mt-10 flex items-center gap-4 text-[0.7rem] tracking-[0.15em] text-muted uppercase">
      <span className="h-px flex-1 bg-border" />
      {text}
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
