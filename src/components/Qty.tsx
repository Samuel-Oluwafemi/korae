import { Minus, Plus } from "lucide-react";
export default function Qty({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const b =
    "flex h-10 w-10 items-center justify-center hover:bg-line disabled:opacity-30";
  return (
    <div className="inline-flex items-center border border-line">
      <button
        aria-label="Decrease quantity"
        className={b}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm" aria-live="polite">
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        className={b}
        disabled={value >= 10}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
