import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const desktopFolder = path.join(__dirname, '..', 'data', 'inbox');

console.log('📂 Reading Excel files from:', desktopFolder);
console.log('='.repeat(80));

// Read inreit file
try {
  const file1Path = path.join(desktopFolder, 'inreit (1).xlsx');
  const workbook1 = XLSX.readFile(file1Path);

  console.log('\n\n=== ФАЙЛ: inreit (1).xlsx ===');
  console.log('Sheets:', workbook1.SheetNames);

  workbook1.SheetNames.forEach(sheetName => {
    const worksheet = workbook1.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`\n📊 Sheet: ${sheetName}`);
    console.log(`Rows: ${data.length}`);

    if (data.length > 0) {
      console.log(`Columns: ${Object.keys(data[0] as object).join(', ')}`);
      console.log('\nFirst 3 rows:');
      console.log(JSON.stringify(data.slice(0, 3), null, 2));
    }
    console.log('='.repeat(80));
  });
} catch (error) {
  console.error('Error reading inreit:', error);
}

// Read доходность file
try {
  const file2Path = path.join(desktopFolder, 'доходность за м2 (2).xlsx');
  const workbook2 = XLSX.readFile(file2Path);

  console.log('\n\n=== ФАЙЛ: доходность за м2 (2).xlsx ===');
  console.log('Sheets:', workbook2.SheetNames);

  workbook2.SheetNames.forEach(sheetName => {
    const worksheet = workbook2.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`\n📊 Sheet: ${sheetName}`);
    console.log(`Rows: ${data.length}`);

    if (data.length > 0) {
      console.log(`Columns: ${Object.keys(data[0] as object).join(', ')}`);
      console.log('\nFirst 5 rows:');
      console.log(JSON.stringify(data.slice(0, 5), null, 2));
    }
    console.log('='.repeat(80));
  });
} catch (error) {
  console.error('Error reading доходность:', error);
}

console.log('\n\n✅ Done reading Excel files!');
