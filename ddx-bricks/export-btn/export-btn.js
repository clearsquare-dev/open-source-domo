// Available globals
// Step 1. Select your dataset(s) from the button in the bottom left corner
var domo = window.domo;
var datasets = window.datasets;

// Step 2. Query your dataset(s)
var fields = ["state", "revenue"];
var groupby = ["state"];
var query = `/data/v1/${datasets[0]}?fields=${fields.join()}&groupby=${groupby.join()}`;

// Function to convert data to CSV format
function convertToCSV(data) {
  const header = Object.keys(data[0]);
  const rows = data.map((row) => header.map((field) => JSON.stringify(row[field], replacer)).join(","));
  return [header.join(","), ...rows].join("\n");
}

// Replace null values with empty strings in CSV output
function replacer(key, value) {
  return value === null ? "" : value;
}

var exportButton = document.getElementById("exportButton");
exportButton.onclick = function () {
  downloadAsCSV();
};

// Step 3. Do something with the data from the query result
function downloadAsCSV() {
  domo.get(query).then(handleData);
}

function handleData(data) {
  // Convert data to CSV format
  var csv = convertToCSV(data);

  // Create a downloadable link
  var blob = new Blob([csv], { type: "text/csv" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.csv";

  // Trigger the download
  link.click();
}