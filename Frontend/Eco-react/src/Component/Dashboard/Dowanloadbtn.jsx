// src/components/dashboard/DownloadButtons.jsx

import { exportToCSV, exportToPDF } from "../../utils/dashboard/exportUtils";

export default function DownloadButtons({ rows, columns }) {
  const disabled = rows.length === 0;

  return (
    <div className="db-export">
      <button disabled={disabled} onClick={() => exportToCSV(rows, columns)}>
        Download CSV
      </button>
      <button disabled={disabled} onClick={() => exportToPDF(rows, columns)}>
        Download PDF
      </button>
    </div>
  );
}