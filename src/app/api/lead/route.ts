import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface LeadData {
  contact: string;
  city: string;
  budget: number;
  goal: string;
  horizon: string;
  risk?: string;
  mortgageNeeded?: boolean;
  selectedProjectIds?: string[];
  calculatorInputs?: any;
  sourcePage?: string;
  utm?: any;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Валидация
    if (!data.contact || !data.city || !data.budget || !data.goal || !data.horizon) {
      return NextResponse.json(
        { error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }

    // Форматирование бюджета
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      }).format(value);
    };

    // Составление сообщения
    let message = `🎯 *НОВАЯ ЗАЯВКА НА SHORTLIST*

👤 *Контакт:* ${data.contact}
🏙️ *Город:* ${data.city}
💰 *Бюджет:* ${formatCurrency(data.budget)}

🎯 *Цель:* ${data.goal}
⏱️ *Горизонт:* ${data.horizon}`;

    // Опциональные поля
    if (data.risk) {
      message += `\n⚠️ *Риск:* ${data.risk}`;
    }

    if (data.mortgageNeeded) {
      message += `\n🏦 *Рассрочка/ипотека:* Да`;
    }

    if (data.selectedProjectIds && data.selectedProjectIds.length > 0) {
      message += `\n\n📋 *Выбранные проекты:*\n`;
      data.selectedProjectIds.forEach(id => {
        message += `  • ${id}\n`;
      });
    }

    if (data.calculatorInputs) {
      message += `\n\n🧮 *Данные калькулятора:*\n`;
      message += `  • Город: ${data.calculatorInputs.city || 'N/A'}\n`;
      message += `  • Бюджет: ${formatCurrency(data.calculatorInputs.budget || 0)}\n`;
      message += `  • Площадь: ${data.calculatorInputs.area || 'N/A'} м²\n`;
    }

    // Метаданные
    message += `\n\n📍 *Источник:* ${data.sourcePage || 'unknown'}`;

    if (data.utm) {
      message += `\n🔗 *UTM:* ${JSON.stringify(data.utm)}`;
    }

    message += `\n\n⏰ *Дата:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    // Отправка в Telegram
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram configuration missing');
      console.log('Lead received (no telegram):', {
        contact: data.contact,
        city: data.city,
        budget: data.budget,
        goal: data.goal,
        sourcePage: data.sourcePage,
        timestamp: new Date().toISOString(),
      });

      // Возвращаем успех даже без Telegram (чтобы форма работала)
      return NextResponse.json({
        success: true,
        message: 'Заявка принята. Свяжемся в течение 24 часов.',
        warning: 'Telegram not configured'
      });
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', responseData);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram', details: responseData },
        { status: 500 }
      );
    }

    // Логирование (опционально можно добавить в базу данных)
    console.log('Lead received:', {
      contact: data.contact,
      city: data.city,
      budget: data.budget,
      goal: data.goal,
      sourcePage: data.sourcePage,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Заявка принята. Свяжемся в течение 24 часов.',
      telegram: responseData
    });

  } catch (error) {
    console.error('Error in lead API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
