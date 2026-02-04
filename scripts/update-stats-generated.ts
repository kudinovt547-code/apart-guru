import * as fs from 'fs';
import * as path from 'path';

/**
 * Обновляем stats.generated.json с новой базой из 54 проектов
 */

// Читаем новую расширенную базу
const newDbPath = path.join(__dirname, '..', 'data', 'content', 'full-apartments-database-52plus.json');
const newProjects = JSON.parse(fs.readFileSync(newDbPath, 'utf-8'));

console.log(`📊 Загружено ${newProjects.length} проектов из новой базы\n`);

// Создаем stats.generated.json в правильном формате
const statsGenerated = {
  objects: newProjects,
  sources: {
    updatedAt: new Date().toISOString().split('T')[0],
    source: 'Real data from inREIT, web sources, and market research 2025-2026 (54 projects across 9 cities)',
  },
};

// Сохраняем в src/data/stats.generated.json
const outputPath = path.join(__dirname, '..', 'src', 'data', 'stats.generated.json');
fs.writeFileSync(outputPath, JSON.stringify(statsGenerated, null, 2));

console.log(`✅ Обновлен stats.generated.json: ${newProjects.length} проектов`);
console.log(`📂 Путь: ${outputPath}`);

// Статистика
console.log(`\n📈 Статистика базы:\n`);

const cityCounts = newProjects.reduce((acc: Record<string, number>, p: any) => {
  acc[p.city] = (acc[p.city] || 0) + 1;
  return acc;
}, {});

console.log('📍 По городам:');
Object.entries(cityCounts)
  .sort(([, a], [, b]) => (b as number) - (a as number))
  .forEach(([city, count]) => {
    console.log(`   ${city}: ${count}`);
  });

const formatCounts = newProjects.reduce((acc: Record<string, number>, p: any) => {
  acc[p.format] = (acc[p.format] || 0) + 1;
  return acc;
}, {});

console.log('\n🏨 По формату:');
Object.entries(formatCounts).forEach(([format, count]) => {
  console.log(`   ${format}: ${count}`);
});

const statusCounts = newProjects.reduce((acc: Record<string, number>, p: any) => {
  acc[p.status] = (acc[p.status] || 0) + 1;
  return acc;
}, {});

console.log('\n📊 По статусу:');
Object.entries(statusCounts).forEach(([status, count]) => {
  console.log(`   ${status}: ${count}`);
});

// Средние показатели
const avgPrice = Math.round(newProjects.reduce((sum: number, p: any) => sum + p.price, 0) / newProjects.length);
const avgPayback = (newProjects.reduce((sum: number, p: any) => sum + p.paybackYears, 0) / newProjects.length).toFixed(1);
const avgOccupancy = Math.round(newProjects.reduce((sum: number, p: any) => sum + p.occupancy, 0) / newProjects.length);
const avgRevPerM2 = Math.round(newProjects.reduce((sum: number, p: any) => sum + p.revPerM2Month, 0) / newProjects.length);

console.log(`\n💰 Средние показатели:`);
console.log(`   Цена: ${avgPrice.toLocaleString('ru-RU')} ₽`);
console.log(`   Доходность: ${avgRevPerM2} ₽/м²/мес`);
console.log(`   Окупаемость: ${avgPayback} лет`);
console.log(`   Загрузка: ${avgOccupancy}%`);

console.log(`\n🎉 База готова к использованию!`);
