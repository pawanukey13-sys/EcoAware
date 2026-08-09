// src/pages/Dashboard/components/FilterBar.jsx

import { categories, allCountries, allYears } from "../../Data/Dashboard";

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  country,
  onCountryChange,
  year,
  onYearChange,
  onReset,
}) {
  return (
    <div className="db-filterbar">
      <input
        type="text"
        className="db-search"
        placeholder="Search dataset..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="db-select"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        className="db-select"
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        <option value="All">Featured countries</option>
        {allCountries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="db-select"
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
      >
        <option value="All">All Years</option>
        {allYears.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <button className="db-reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}