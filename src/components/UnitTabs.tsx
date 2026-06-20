import type { UnitName } from "@/types/lesson";

type UnitTabsProps = {
  units: UnitName[];
  selectedUnit: UnitName;
  onSelectUnit: (unit: UnitName) => void;
};

export function UnitTabs({ units, selectedUnit, onSelectUnit }: UnitTabsProps) {
  return (
    <div className="hidden rounded-lg border border-line bg-white p-1 shadow-sm md:flex" role="tablist" aria-label="단원 선택">
      {units.map((unit) => {
        const selected = unit === selectedUnit;

        return (
          <button
            key={unit}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-current={selected ? "page" : undefined}
            onClick={() => onSelectUnit(unit)}
            className={[
              "min-h-10 flex-1 rounded-md px-4 text-base font-medium transition",
              selected ? "bg-point text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-ink"
            ].join(" ")}
          >
            {unit}
          </button>
        );
      })}
    </div>
  );
}
