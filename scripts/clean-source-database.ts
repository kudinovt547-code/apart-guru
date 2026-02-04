import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Очистка исходной базы данных от фейковых значений
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, '..', 'data', 'content', 'full-apartments-database-52plus.json');
const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf-8'));

console.log(`📊 Очистка исходной базы: ${sourceData.length} проектов\n`);

let cleanedCount = 0;

const cleanedData = sourceData.map((project: any) => {
  const hadFakeData = project.managementFee !== undefined ||
                      project.investorShare !== undefined ||
                      project.operatingExpenses !== undefined;

  if (hadFakeData) {
    cleanedCount++;
    console.log(`🧹 ${project.title}: удаляю фейковые данные`);
  }

  // Удаляем фейковые поля
  const { managementFee, investorShare, operatingExpenses, ...cleanProject } = project;

  return cleanProject;
});

// Сохраняем
fs.writeFileSync(sourcePath, JSON.stringify(cleanedData, null, 2));

console.log(`\n✅ Очищено проектов: ${cleanedCount}`);
console.log(`📂 Сохранено: ${sourcePath}`);
console.log('\n✨ Исходная база очищена от фейковых данных!');
