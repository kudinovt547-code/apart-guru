import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

interface MonthData {
  month: string;
  revenue: number;
  investorPayout: number;
  maxPayout: number;
  investorPercent: number;
  annualYield: number;
  yieldPerRoom: number;
  yieldPerM2: number;
  adr: number;
  revPar: number;
  occupancy: number;
}

interface HotelData {
  name: string;
  area: number;
  roomsArea: number;
  data2024: MonthData[];
  data2025: MonthData[];
}

const inboxPath = path.join(__dirname, '..', 'data', 'inbox');
const file1Path = path.join(inboxPath, 'inreit (1).xlsx');

console.log('📊 Parsing inREIT Excel data...\n');

const workbook = XLSX.readFile(file1Path);
const hotels: HotelData[] = [];

// Skip first sheet (общая информация)
const hotelSheets = workbook.SheetNames.slice(1);

hotelSheets.forEach(sheetName => {
  console.log(`\n🏨 Processing: ${sheetName}`);

  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

  // Extract hotel info
  const areaRow = data.find(row => row[0] === 'Площадь номеров' || row[0] === 'Площаь отеля');
  const roomsArea = areaRow ? parseFloat(areaRow[1]) : 0;

  const hotel: HotelData = {
    name: sheetName.trim(),
    area: roomsArea,
    roomsArea: roomsArea,
    data2024: [],
    data2025: [],
  };

  // Find headers row
  const headerRowIndex = data.findIndex(row =>
    row[3] === '2024 год' || row[14] === 2025
  );

  if (headerRowIndex < 0) {
    console.log(`⚠️ Could not find headers for ${sheetName}`);
    return;
  }

  // Parse months data
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  for (let i = headerRowIndex + 2; i < data.length && i < headerRowIndex + 14; i++) {
    const row = data[i];
    const monthName = row[3];

    if (!months.includes(monthName)) continue;

    // Parse 2024 data (columns 4-13)
    const month2024: MonthData = {
      month: monthName,
      revenue: parseFloat(row[4]) || 0,
      investorPayout: parseFloat(row[5]) || 0,
      maxPayout: parseFloat(row[6]) || 0,
      investorPercent: parseFloat(row[7]) || 0,
      annualYield: parseFloat(row[8]) || 0,
      yieldPerRoom: parseFloat(row[9]) || 0,
      yieldPerM2: parseFloat(row[10]) || 0,
      adr: parseFloat(row[11]) || 0,
      revPar: parseFloat(row[12]) || 0,
      occupancy: parseFloat(row[13]) || 0,
    };

    // Parse 2025 data (columns 14-23)
    const month2025: MonthData = {
      month: monthName,
      revenue: parseFloat(row[14]) || 0,
      investorPayout: parseFloat(row[15]) || 0,
      maxPayout: parseFloat(row[16]) || 0,
      investorPercent: parseFloat(row[17]) || 0,
      annualYield: parseFloat(row[18]) || 0,
      yieldPerRoom: parseFloat(row[19]) || 0,
      yieldPerM2: parseFloat(row[20]) || 0,
      adr: parseFloat(row[21]) || 0,
      revPar: parseFloat(row[22]) || 0,
      occupancy: parseFloat(row[23]) || 0,
    };

    if (month2024.revenue > 0 || month2024.investorPayout > 0) {
      hotel.data2024.push(month2024);
    }

    if (month2025.revenue > 0 || month2025.investorPayout > 0) {
      hotel.data2025.push(month2025);
    }
  }

  hotels.push(hotel);

  console.log(`✓ Parsed ${hotel.name}:`);
  console.log(`  - Area: ${hotel.roomsArea} m²`);
  console.log(`  - 2024 data points: ${hotel.data2024.length}`);
  console.log(`  - 2025 data points: ${hotel.data2025.length}`);
});

console.log(`\n\n📈 Summary:`);
console.log(`Total hotels parsed: ${hotels.length}`);

// Calculate averages for each hotel
console.log(`\n\n💰 Hotel Performance Summary (2024):\n`);

hotels.forEach(hotel => {
  if (hotel.data2024.length === 0) return;

  const avgYieldPerM2 = hotel.data2024.reduce((sum, m) => sum + m.yieldPerM2, 0) / hotel.data2024.length;
  const avgOccupancy = hotel.data2024.reduce((sum, m) => sum + m.occupancy, 0) / hotel.data2024.length;
  const avgADR = hotel.data2024.reduce((sum, m) => sum + m.adr, 0) / hotel.data2024.length;
  const avgAnnualYield = hotel.data2024.reduce((sum, m) => sum + m.annualYield, 0) / hotel.data2024.length;
  const totalInvestorPayout = hotel.data2024.reduce((sum, m) => sum + m.investorPayout, 0);

  console.log(`🏨 ${hotel.name}`);
  console.log(`   Доходность: ${Math.round(avgYieldPerM2)} ₽/м²/мес`);
  console.log(`   Загрузка: ${(avgOccupancy * 100).toFixed(1)}%`);
  console.log(`   ADR: ${Math.round(avgADR)} ₽`);
  console.log(`   Годовая доходность: ${(avgAnnualYield * 100).toFixed(2)}%`);
  console.log(`   Выплачено инвесторам за 2024: ${Math.round(totalInvestorPayout).toLocaleString('ru-RU')} ₽`);
  console.log('');
});

// Save parsed data
const outputPath = path.join(__dirname, '..', 'data', 'processed', 'inreit-parsed.json');
fs.writeFileSync(outputPath, JSON.stringify(hotels, null, 2));

console.log(`\n✅ Saved parsed data to: ${outputPath}`);
console.log('\nDone!');
