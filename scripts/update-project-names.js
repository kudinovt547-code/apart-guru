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

function processTitle(title) {
  // Skip if already has Inreit prefix
  if (title.startsWith('Inreit ')) {
    return title;
  }

  // Extract parentheses content for later (may need it for uniqueness)
  const parenthesesMatch = title.match(/\(([^)]+)\)/);
  const parenthesesContent = parenthesesMatch ? parenthesesMatch[1] : null;

  // Remove everything in parentheses (English names, etc.)
  let processed = title.replace(/\s*\([^)]*\)/g, '');

  // Remove numbers and special chars like "/" but keep hyphens
  processed = processed.replace(/\d+/g, '').replace(/\//g, '');

  // Transliterate Cyrillic to Latin
  processed = transliterate(processed);

  // Remove soft sign artifacts (ь)
  processed = processed.replace(/ь/g, '');

  // Clean up extra spaces, commas, dots at the end
  processed = processed.replace(/\s+/g, ' ').replace(/[,.\s]+$/, '').trim();

  // Add Inreit prefix
  processed = 'Inreit ' + processed;

  return processed;
}

// Read the JSON file
const filePath = path.join(__dirname, '../src/data/stats.generated.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Process each object
data.objects = data.objects.map(obj => {
  const newTitle = processTitle(obj.title);
  console.log(`${obj.title} → ${newTitle}`);

  return {
    ...obj,
    title: newTitle
  };
});

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('\n✅ Updated', data.objects.length, 'project titles');

// Also update the source file
const sourceFilePath = path.join(__dirname, '../data/content/stats.generated.json');
if (fs.existsSync(sourceFilePath)) {
  fs.writeFileSync(sourceFilePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ Updated source file as well');
}
