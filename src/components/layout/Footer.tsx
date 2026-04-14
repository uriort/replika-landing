export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-muted">
        <div className="flex items-center gap-2">
          <span className="font-serif gradient-text font-semibold text-sm">
            Replika
          </span>
          <span className="text-white/10">|</span>
          <span>By Deeper Signals</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Science</span>
          <span>Privacy</span>
          <span>Contact</span>
        </div>
        <span>&copy; 2026 Deeper Signals, Inc.</span>
      </div>
    </footer>
  );
}
