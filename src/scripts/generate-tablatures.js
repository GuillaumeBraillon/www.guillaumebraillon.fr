import fs from "fs";
import path from "path";

const root = "public/tablatures";

const tablatures = [];

let globalIndex = 0;

const EXCLUDED = new Set([".DS_Store", "Thumbs.db"]);

// Walk through the tablatures directory and its subdirectories to find all tablature files
function walk(dir) {
  const entries = fs

    .readdirSync(dir, { withFileTypes: true })

    .filter(
      (entry) =>
        !entry.name.startsWith(".") && !entry.name.includes("_html_") && !EXCLUDED.has(entry.name)
    );

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);

      continue;
    }

    const relativePath = fullPath.replace("public", "");

    tablatures.push({
      name: entry.name,

      path: relativePath,

      letter: relativePath.split("/")[2],

      extension: path.extname(entry.name).replace(".", ""),

      index: globalIndex++,
    });
  }
}

// Start walking through the root directory
walk(root);

// Write the tablatures array to a JSON file
fs.writeFileSync("src/data/tablatures.json", JSON.stringify(tablatures, null, 2));

// Log the number of tablatures indexed
console.log(`${tablatures.length} tablatures indexées`);
