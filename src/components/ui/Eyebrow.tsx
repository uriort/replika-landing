interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-accent-purple mb-6 ${className}`}
    >
      {children}
    </span>
  );
}
