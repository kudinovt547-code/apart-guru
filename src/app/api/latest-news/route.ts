import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'src/data/editorial-news.json');
    
    // Проверяем, существует ли файл
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ news: null }, { status: 200 });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const news = JSON.parse(fileContent);
    
    // Возвращаем первую (самую новую) новость или null если массив пустой
    const latestNews = news.length > 0 ? news[0] : null;
    
    return NextResponse.json({ news: latestNews }, { status: 200 });
  } catch (error) {
    console.error('Ошибка при загрузке новостей:', error);
    return NextResponse.json({ news: null }, { status: 200 });
  }
}