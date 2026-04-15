export default function Footer() {
  return (
    <footer className="border-t border-foreground/[0.06] bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-muted">
        <div className="flex items-center gap-2">
          <span className="font-serif gradient-text font-semibold text-sm">
            Replika
          </span>
          <span className="text-foreground/10">|</span>
          <span>
            By{" "}
            <a
              href="https://www.deepersignals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Deeper Signals
            </a>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span>Science</span>
          <a
            href="https://deepersignals.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <span>Contact</span>
        </div>
        <span>&copy; 2026 Deeper Signals, Inc.</span>
      </div>
    </footer>
  );
}
