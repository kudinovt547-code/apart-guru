import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram configuration missing');
      console.log('Message received (no telegram):', { type, data });

      // Возвращаем успех даже без Telegram (чтобы форма работала)
      return NextResponse.json({
        success: true,
        warning: 'Telegram not configured'
      });
    }

    let message = '';

    if (type === 'contact') {
      message = `🔔 *Новая заявка на подбор*

👤 *Имя:* ${data.name}
📱 *Контакт:* ${data.contact}
💰 *Бюджет:* ${data.budget || 'Не указан'}
🏙️ *Города:* ${data.city || 'Не указано'}
📊 *Риск-профиль:* ${data.riskProfile || 'Не указан'}
💬 *Сообщение:* ${data.message || 'Нет'}

Свяжитесь с клиентом как можно скорее! ⚡`;
    } else {
      message = JSON.stringify(data, null, 2);
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

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error('Error in send-telegram API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
