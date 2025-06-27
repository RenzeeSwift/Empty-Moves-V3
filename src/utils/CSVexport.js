export function exportToCSV(rows) {
  if (!rows.length) return;
  const header = Object.keys(rows[0]);
  const csv =
    header.join(",") +
    "\n" +
    rows.map((row) => header.map((k) => row[k]).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "route.csv";
  a.click();
  URL.revokeObjectURL(url);
}