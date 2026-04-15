interface ArrowCTAProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function ArrowCTA({
  href,
  children,
  variant = "primary",
  className = "",
}: ArrowCTAProps) {
  const base =
    "group inline-flex items-center gap-3 text-sm font-medium tracking-wide transition-all duration-300";
  const variants = {
    primary:
      "px-8 py-4 rounded-full bg-foreground text-white hover:bg-foreground/90 shadow-md hover:shadow-lg",
    secondary: "text-muted hover:text-foreground",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </a>
  );
}
