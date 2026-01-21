const fs = require('fs');
const path = require('path');

// Transliteration map from Russian to Latin
const translitMap = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
  'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
  'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
  'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
  'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
  'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
  'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts',
  'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
  'Я': 'Ya'
};

function transliterate(text) {
  return text.split('').map(char => translitMap[char] || char).join('');
}

function isInreitProject(obj) {
  // Inreit projects have city: "Unknown" and summary starting with "Inreit |"
  return obj.city === "Unknown" && obj.summary && obj.summary.startsWith("Inreit |");
}

function processInreitTitle(title) {
  // Remove parentheses content
  let processed = title.replace(/\s*\([^)]*\)/g, '');

  // Remove numbers
  processed = processed.replace(/\d+/g, '');

  // Transliterate Cyrillic to Latin
  processed = transliterate(processed);

  // Remove soft sign artifacts (ь)
  processed = processed.replace(/ь/g, '');

  // Clean up extra spaces
  processed = processed.replace(/\s+/g, ' ').trim();

  // Add Inreit prefix
  processed = 'Inreit ' + processed;

  return processed;
}

// Generic why/risks for different project types
const defaultWhy = {
  'low': [
    "Стабильный рынок с постоянным спросом",
    "Развитая инфраструктура района",
    "Высокая ликвидность объекта"
  ],
  'medium': [
    "Растущий рынок с хорошим потенциалом",
    "Удобное расположение с транспортной доступностью",
    "Сбалансированное соотношение цены и доходности"
  ],
  'high': [
    "Высокая доходность на квадратный метр",
    "Потенциал роста стоимости актива",
    "Активный туристический поток"
  ]
};

const defaultRisks = {
  'low': [
    "Умеренная конкуренция на рынке краткосрочной аренды",
    "Сезонные колебания спроса"
  ],
  'medium': [
    "Конкуренция со стороны новых объектов",
    "Зависимость от экономической ситуации в регионе",
    "Возможные изменения в законодательстве"
  ],
  'high': [
    "Высокая конкуренция на рынке",
    "Значительные сезонные колебания",
    "Чувствительность к макроэкономическим факторам"
  ]
};

// Read the JSON file
const filePath = path.join(__dirname, '../src/data/stats.generated.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let inreitCount = 0;
let filledWhyCount = 0;
let filledRisksCount = 0;

// Process each object
data.objects = data.objects.map(obj => {
  const updated = { ...obj };

  // Update Inreit project titles
  if (isInreitProject(obj)) {
    const newTitle = processInreitTitle(obj.title);
    console.log(`✓ Inreit: ${obj.title} → ${newTitle}`);
    updated.title = newTitle;
    inreitCount++;
  }

  // Fill empty why arrays
  if (!obj.why || obj.why.length === 0) {
    const riskLevel = obj.riskLevel || 'medium';
    updated.why = defaultWhy[riskLevel] || defaultWhy['medium'];
    filledWhyCount++;
  }

  // Fill empty risks arrays
  if (!obj.risks || obj.risks.length === 0) {
    const riskLevel = obj.riskLevel || 'medium';
    updated.risks = defaultRisks[riskLevel] || defaultRisks['medium'];
    filledRisksCount++;
  }

  return updated;
});

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n✅ Summary:');
console.log(`   ${inreitCount} Inreit project titles updated`);
console.log(`   ${filledWhyCount} empty 'why' fields filled`);
console.log(`   ${filledRisksCount} empty 'risks' fields filled`);

// Also update the source file
const sourceFilePath = path.join(__dirname, '../data/content/stats.generated.json');
if (fs.existsSync(sourceFilePath)) {
  fs.writeFileSync(sourceFilePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ Updated source file as well');
}
