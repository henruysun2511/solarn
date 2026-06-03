import * as XLSX from "xlsx";

interface Column {
  key: string;
  header: string;
}

export function exportToExcel<T extends Record<string, unknown>>(
  data: T[],
  columns: Column[],
  filename: string,
) {
  const rows = data.map((item) => {
    const row: Record<string, unknown> = {};
    for (const col of columns) {
      row[col.header] = item[col.key];
    }
    return row;
  });

  const ws = XLSX.utils.json_to_sheet(rows);

  const colWidths = columns.map((col) => ({
    wch: Math.max(col.header.length, ...rows.map((r) => String(r[col.header] || "").length)),
  }));
  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`);
}
