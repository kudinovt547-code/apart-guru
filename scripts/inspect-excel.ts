#!/usr/bin/env node

import * as XLSX from "xlsx";
import * as path from "path";

const INBOX_DIR = path.join(process.cwd(), "data/inbox");

function inspectExcel(filename: string) {
  const filePath = path.join(INBOX_DIR, filename);
  console.log(`\n📋 Inspecting: ${filename}`);
  console.log("=".repeat(60));

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  console.log(`Sheet: ${sheetName}`);
  console.log(`Rows: ${jsonData.length}`);

  if (jsonData.length > 0) {
    console.log("\nColumns:");
    const firstRow = jsonData[0] as any;
    Object.keys(firstRow).forEach((key, idx) => {
      console.log(`  ${idx + 1}. ${key}`);
    });

    console.log("\nFirst row sample:");
    console.log(JSON.stringify(firstRow, null, 2));
  }
}

// Inspect both files
inspectExcel("ApartPro_Stats_FullCards_Only_v1.xlsx");
inspectExcel("ApartPro_Construction_Only_PriceArea_v1.xlsx");
