export interface TelegramLeadPayload {
  source: string;
  name: string;
  phone: string;
  carMakeModel?: string;
  serviceInterest?: string;
  materialDetails?: string;
  estimatedCost?: string;
  comment?: string;
  configSummary?: string[];
  photosCount?: number;
}

export interface TelegramSendResult {
  success: boolean;
  isConfigured: boolean;
  message: string;
  error?: string;
}

export async function sendLeadToTelegram(payload: TelegramLeadPayload): Promise<TelegramSendResult> {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  // Build the message text
  const lines: string[] = [
    `🏎 *НОВАЯ ЗАЯВКА С САЙТА ART TUNING*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Имя:* ${payload.name || 'Не указано'}`,
    `📞 *Телефон:* ${payload.phone}`,
  ];

  if (payload.carMakeModel) {
    lines.push(`🚘 *Автомобиль:* ${payload.carMakeModel}`);
  }

  if (payload.serviceInterest) {
    lines.push(`🛠 *Услуга:* ${payload.serviceInterest}`);
  }

  if (payload.materialDetails) {
    lines.push(`✨ *Материал / Цвет:* ${payload.materialDetails}`);
  }

  if (payload.estimatedCost) {
    lines.push(`💰 *Предварительный расчет:* ${payload.estimatedCost}`);
  }

  if (payload.configSummary && payload.configSummary.length > 0) {
    lines.push(`\n📋 *Выбранные опции:*`);
    payload.configSummary.forEach(item => {
      lines.push(`• ${item}`);
    });
  }

  if (payload.comment) {
    lines.push(`\n💬 *Комментарий клиента:*\n${payload.comment}`);
  }

  if (payload.photosCount && payload.photosCount > 0) {
    lines.push(`\n📷 *Прикреплено фото авто:* ${payload.photosCount} шт.`);
  }

  lines.push(`\n📍 *Источник:* ${payload.source}`);
  lines.push(`⏰ *Время:* ${new Date().toLocaleString('ru-RU')}`);

  const text = lines.join('\n');

  // Check if Telegram credentials are provided
  if (!botToken || !chatId || botToken === 'YOUR_BOT_TOKEN' || chatId === 'YOUR_CHAT_ID') {
    return {
      success: false,
      isConfigured: false,
      message: 'Архитектура Telegram Bot API готова, однако токен бота VITE_TELEGRAM_BOT_TOKEN или VITE_TELEGRAM_CHAT_ID не заданы в .env.',
      error: 'TELEGRAM_CREDENTIALS_MISSING'
    };
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (data.ok) {
      return {
        success: true,
        isConfigured: true,
        message: 'Заявка успешно доставлена в Telegram мастеру!'
      };
    } else {
      return {
        success: false,
        isConfigured: true,
        message: `Ошибка отправки в Telegram: ${data.description || 'Неизвестная ошибка'}`,
        error: data.description
      };
    }
  } catch (err: any) {
    return {
      success: false,
      isConfigured: true,
      message: `Сетевая ошибка при отправке в Telegram: ${err.message || 'Ошибка подключения'}`,
      error: err.toString()
    };
  }
}
