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
        className={`w-full px-4 py-3.5 rounded-xl bg-surface border text-foreground placeholder:text-muted/40 text-sm transition-all duration-200 outline-none focus:bg-white focus:shadow-md ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-foreground/[0.08] focus:border-accent-purple/50"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
