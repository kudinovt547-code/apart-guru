import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'Telegram credentials not configured' },
        { status: 500 }
      );
    }

    let message = '';

    if (type === 'contact') {
      // Contact form lead
      message = `🎯 <b>Новая заявка на подбор</b>\n\n`;
      message += `👤 <b>Имя:</b> ${data.name}\n`;
      message += `📱 <b>Контакт:</b> ${data.contact}\n`;

      if (data.budget) {
        message += `💰 <b>Бюджет:</b> ${data.budget} млн ₽\n`;
      }

      if (data.city) {
        message += `🏙 <b>Города:</b> ${data.city}\n`;
      }

      if (data.riskProfile) {
        const riskLabels: Record<string, string> = {
          'low': 'Консервативный',
          'medium': 'Умеренный',
          'high': 'Агрессивный'
        };
        message += `📊 <b>Риск-профиль:</b> ${riskLabels[data.riskProfile] || data.riskProfile}\n`;
      }

      if (data.message) {
        message += `\n💬 <b>Сообщение:</b>\n${data.message}`;
      }
    } else if (type === 'report') {
      // PDF report request
      message = `📄 <b>Запрос PDF-отчета сравнения</b>\n\n`;
      message += `👤 <b>Имя:</b> ${data.name}\n`;
      message += `📱 <b>Контакт:</b> ${data.contact}\n`;

      if (data.projects && data.projects.length > 0) {
        message += `\n🏢 <b>Проекты для сравнения:</b>\n`;
        data.projects.forEach((slug: string, idx: number) => {
          message += `  ${idx + 1}. ${slug}\n`;
        });
      }
    }

    message += `\n⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', result);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
