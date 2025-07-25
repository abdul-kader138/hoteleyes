import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

interface GamesFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  featureFilter: string;
  setFeatureFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
}

function CustomSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[] | { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  const isObjectOptions = typeof options[0] === "object";

  const displayLabel = () => {
    if (value === "") return label;
    if (!isObjectOptions) return value;
    const found = (options as { label: string; value: string }[]).find(
      (opt) => opt.value === value
    );
    return found?.label || value;
  };

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-40 cursor-pointer rounded bg-gray-800 py-2 pl-3 pr-10 text-left text-white focus:outline-none focus:ring-2 focus:ring-[#D90479]">
          <span className="block truncate">{displayLabel()}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-gray-900 py-1 text-white shadow-lg ring-1 ring-black/10 focus:outline-none">
          <Listbox.Option
            value=""
            className={({ active }) =>
              `cursor-pointer select-none px-4 py-2 ${
                active ? "bg-[#D90479]" : ""
              }`
            }
          >
            {label}
          </Listbox.Option>
          {options.map((option: any) => {
            const val = typeof option === "string" ? option : option.value;
            const text = typeof option === "string" ? option : option.label;
            return (
              <Listbox.Option
                key={val}
                value={val}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? "bg-[#D90479]" : ""
                  }`
                }
              >
                {text}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default function GameFilter({
  searchTerm,
  setSearchTerm,
  featureFilter,
  setFeatureFilter,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
}: GameFilterProps) {
  const { gamesFilterData } = new Helper();

  return (
    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder={Lang.search_game}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded bg-gray-800 text-white w-full sm:w-1/4 outline-none focus:ring-2 focus:ring-[#D90479]"
      />

      {/* Custom Selects */}
      <div className="flex gap-2 flex-wrap">
        <CustomSelect
          label={Lang.features}
          value={featureFilter}
          options={gamesFilterData.features}
          onChange={setFeatureFilter}
        />
        <CustomSelect
          label={Lang.game_type}
          value={typeFilter}
          options={gamesFilterData.types}
          onChange={setTypeFilter}
        />
        <CustomSelect
          label={Lang.categories}
          value={categoryFilter}
          options={gamesFilterData.categories}
          onChange={setCategoryFilter}
        />
        <CustomSelect
          label={Lang.sort_by}
          value={sortOption}
          options={gamesFilterData.sortOptions}
          onChange={setSortOption}
        />
      </div>
    </div>
  );
}
