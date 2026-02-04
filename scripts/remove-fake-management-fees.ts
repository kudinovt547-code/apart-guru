import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

/**
 * Удаляем фейковые данные о комиссиях УК
 * Оставляем только реальные проверенные данные
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statsPath = path.join(__dirname, '..', 'src', 'data', 'stats.generated.json');
const statsData = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));

console.log(`📊 Очистка ${statsData.objects.length} проектов от фейковых данных\n`);

let removedCount = 0;

statsData.objects = statsData.objects.map((project: any) => {
  const hadFakeData = project.managementFee !== undefined || project.investorShare !== undefined;

  if (hadFakeData) {
    removedCount++;
    console.log(`🗑️  ${project.title}: удаляю фейковые комиссии УК`);
  }

  // Удаляем фейковые поля
  const { managementFee, investorShare, operatingExpenses, ...cleanProject } = project;

  return cleanProject;
});

// Обновляем источники
statsData.sources.updatedAt = new Date().toISOString().split('T')[0];
statsData.sources.source += ' | Removed fake management fee data - showing only verified facts';

// Сохраняем
fs.writeFileSync(statsPath, JSON.stringify(statsData, null, 2));

console.log(`\n✅ Удалено фейковых данных из ${removedCount} проектов`);
console.log(`📂 Сохранено: ${statsPath}`);
console.log('\n✨ Теперь показываем только реальные проверенные факты!');
