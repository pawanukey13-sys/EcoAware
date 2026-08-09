// src/pages/Dashboard/utils/exportUtils.js
//
// PDF export uses jsPDF — run: npm install jspdf

import jsPDF from "jspdf";

export function exportToCSV(rows, columns, filename = "environmental-data.csv") {
  if (!rows.length) return;

  const header = columns.join(",");
  const body = rows
    .map((row) => columns.map((col) => `"${row[col]}"`).join(","))
    .join("\n");

  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportToPDF(rows, columns, filename = "environmental-data.pdf") {
  if (!rows.length) return;

  const doc = new jsPDF();
  const marginX = 14;
  let y = 20;

  doc.setFontSize(14);
  doc.text("Environmental Analytics — Data Export", marginX, y);
  y += 10;

  doc.setFontSize(10);
  const colWidth = 40;

  // Header row
  columns.forEach((col, i) => {
    doc.text(String(col), marginX + i * colWidth, y);
  });
  y += 6;
  doc.line(marginX, y - 2, marginX + colWidth * columns.length, y - 2);

  // Data rows, paginating when near the bottom of the page
  rows.forEach((row) => {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    columns.forEach((col, i) => {
      doc.text(String(row[col]), marginX + i * colWidth, y);
    });
    y += 7;
  });

  doc.save(filename);
}