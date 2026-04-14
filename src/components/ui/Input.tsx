interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string | null;
  required?: boolean;
}

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-xs font-medium uppercase tracking-[0.15em] text-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border text-foreground placeholder:text-muted/50 text-sm transition-all duration-200 outline-none focus:bg-white/[0.07] ${
          error
            ? "border-red-400/60 focus:border-red-400"
            : "border-white/[0.08] focus:border-accent-purple/50"
        }`}
      />
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
    </div>
  );
}
