// src/components/dashboard/DataTable.jsx

// import EmptyState from "./EmptyState";

export default function DataTable({ rows, columns }) {
  if (!rows.length) {
    return <EmptyState message="No rows match the current filters." />;
  }

  return (
    <div className="db-table-wrap">
      <table className="db-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.country}>
              {columns.map((col) => (
                <td key={col}>{col === "country" ? row.country : row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}