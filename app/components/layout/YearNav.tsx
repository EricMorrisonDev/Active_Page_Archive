"use client";

export type YearNavProps = {
  years: number[];
  /** `null` means show all years. */
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  className?: string;
};

export function YearNav({
  years,
  selectedYear,
  onYearChange,
  className = "",
}: YearNavProps) {
  if (years.length === 0) {
    return null;
  }

  const showAll = years.length > 1;

  return (
    <nav
      className={`font-sans ${className}`}
      aria-label="Filter by year"
    >
      <div className="-mx-1 flex gap-1 overflow-x-auto pb-1">
        {showAll ? (
          <YearButton
            label="All"
            pressed={selectedYear === null}
            onClick={() => onYearChange(null)}
          />
        ) : null}
        {years.map((year) => (
          <YearButton
            key={year}
            label={String(year)}
            pressed={selectedYear === year}
            onClick={() => onYearChange(year)}
          />
        ))}
      </div>
    </nav>
  );
}

function YearButton({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${
        pressed
          ? "border-neutral-800 bg-neutral-800 text-white"
          : "border-neutral-300/90 bg-white text-neutral-700 shadow-sm hover:border-neutral-400 hover:bg-neutral-50"
      }`}
    >
      {label}
    </button>
  );
}
