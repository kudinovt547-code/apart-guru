import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const statsPath = path.join(__dirname, '..', 'src', 'data', 'stats.generated.json');
const statsData = JSON.parse(fs.readFileSync(statsPath, 'utf-8'));

console.log(`📊 Исправление завышенных данных Zamoskvorechye Loft\n`);

statsData.objects = statsData.objects.map((project: any) => {
  if (project.slug === 'zamoskvorechye-loft-msk') {
    console.log(`🔧 ${project.title}:`);
    console.log(`   Было: NOI ${project.noiYear} / ROI ${((project.noiYear/project.price)*100).toFixed(1)}%`);
    
    // Реалистичные данные для Москвы, лофт-апартаменты, средний класс
    // revPerM2Month: 3500-4000 (не 5900)
    // Загрузка: 72-75% (не 76%)
    const реальнаяДоходность = 3800; // ₽/м²/мес
    const реальнаяЗагрузка = 73;
    const newNoiYear = Math.round(реальнаяДоходность * project.area * 12); // 1,824,000
    const newPayback = parseFloat((project.price / newNoiYear).toFixed(1)); // 8.3 года
    
    console.log(`   Стало: NOI ${newNoiYear} / ROI ${((newNoiYear/project.price)*100).toFixed(1)}%`);
    console.log(`   Доходность: ${project.revPerM2Month} → ${реальнаяДоходность} ₽/м²/мес`);
    console.log(`   Загрузка: ${project.occupancy}% → ${реальнаяЗагрузка}%`);
    console.log(`   Окупаемость: ${project.paybackYears} → ${newPayback} лет\n`);
    
    return {
      ...project,
      revPerM2Month: реальнаяДоходность,
      noiYear: newNoiYear,
      paybackYears: newPayback,
      occupancy: реальнаяЗагрузка,
    };
  }
  return project;
});

fs.writeFileSync(statsPath, JSON.stringify(statsData, null, 2));
console.log(`✅ Данные исправлены и сохранены`);
