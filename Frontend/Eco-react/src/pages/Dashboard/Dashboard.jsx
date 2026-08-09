// src/pages/Dashboard/DataDashboard.jsx

import { useState, useMemo } from "react";
import Navbar from "../../Component/Navbar/Navbar"; // adjust to your actual Navbar path
import { categories } from "../../Data/Dashboard";
import { buildComparisonRows } from "../../utility/Dashboard/tableUtility";
import DashboardHeader from "../../Component/Dashboard/DashboardHeader";
import FilterBar from "../../Component/Dashboard/FilterBar";
import CategoryGrid from "../../Component/Dashboard/Summarycard";
import ChartArea from "../../Component/Dashboard/Chartsection";
import DataTable from "../../Component/Dashboard/Datatable";
// import ExportButtons from "../../Component/Dashboard/Emptystate";
import "./Dashboard.css";

export default function DataDashboard() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [country, setCountry] = useState("All");
  const [year, setYear] = useState("All");
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);

  const visibleCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    return categories.filter((c) => {
      const matchesSearch = !q || c.name.toLowerCase().includes(q);
      const matchesFilter = categoryFilter === "All" || c.id === categoryFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, categoryFilter]);

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) || categories[0];

  const tableRows = useMemo(
    () => buildComparisonRows(visibleCategories, { country, year }),
    [visibleCategories, country, year]
  );
  const tableColumns = ["country", ...visibleCategories.map((c) => c.name)];

  function handleReset() {
    setSearch("");
    setCategoryFilter("All");
    setCountry("All");
    setYear("All");
  }

  return (
    <div className="db-page">
      <Navbar />

      <DashboardHeader />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        country={country}
        onCountryChange={setCountry}
        year={year}
        onYearChange={setYear}
        onReset={handleReset}
      />

      <CategoryGrid
        categories={visibleCategories}
        activeCategoryId={activeCategoryId}
        onSelect={setActiveCategoryId}
      />

      <ChartArea category={activeCategory} country={country} year={year} />

      <DataTable rows={tableRows} columns={tableColumns} />

      {/* <ExportButtons rows={tableRows} columns={tableColumns} /> */}
    </div>
  );
}