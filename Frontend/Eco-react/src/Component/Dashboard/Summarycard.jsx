// src/components/dashboard/SummaryCards.jsx

function SummaryCard({ category, isActive, onSelect }) {
  return (
    <button
      className={`db-card ${isActive ? "db-card-active" : ""}`}
      style={{ "--accent": category.accent }}
      onClick={onSelect}
    >
      <span className="db-card-icon">{category.icon}</span>
      <span className="db-card-name">{category.name}</span>
      <span className="db-card-stat">{category.stat.value}</span>
      <span className="db-card-label">{category.stat.label}</span>
    </button>
  );
}

export default function SummaryCards({ categories, activeCategoryId, onSelect }) {
  return (
    <div className="db-grid">
      {categories.map((cat) => (
        <SummaryCard
          key={cat.id}
          category={cat}
          isActive={cat.id === activeCategoryId}
          onSelect={() => onSelect(cat.id)}
        />
      ))}
    </div>
  );
}