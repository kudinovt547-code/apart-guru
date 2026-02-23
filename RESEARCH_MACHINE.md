# Research Machine — автоматический сбор новостей

## Как работает

1. `GET /api/research/fetch-news` — запрашивает RSS-ленты российских сайтов о недвижимости,
   фильтрует по ключевым словам, сохраняет до 60 свежих статей в `src/data/news.json`
2. `/news` — страница автоматически показывает статьи из файла, revalidate раз в час

## Источники (RSS)

| Источник | URL | Кодировка |
|----------|-----|-----------|
| РИА Недвижимость | realty.ria.ru/export/rss2/archive/index.xml | UTF-8 |
| BN.ru | www.bn.ru/rss/news.xml | Windows-1251 (авто-декодирование) |
| Lenta.ru | lenta.ru/rss/articles/nedvizhimost/ | UTF-8 |
| Новостроев | novostroev.ru/rss/ | — |

Если источник недоступен — пропускается без ошибки.

## Запустить вручную (curl)

```bash
curl -X GET https://apart.guru/api/research/fetch-news \
  -H "x-n8n-secret: YOUR_SECRET"
```

Ответ:
```json
{"ok":true,"total":60,"feeds":{"РИА Недвижимость":32,"BN.ru":30,...},"updatedAt":"..."}
```

## Автоматизация: System Cron (на сервере)

Запускать раз в день в 8:00 МСК:

```bash
# Открыть редактор cron
crontab -e

# Добавить строку (заменить SECRET на реальный)
0 5 * * * curl -s -X GET http://localhost:3000/api/research/fetch-news -H "x-n8n-secret: YOUR_SECRET" >> /var/log/apart-research.log 2>&1
```

## Автоматизация: n8n

Workflow в n8n:
1. **Schedule Trigger** — каждый день в 08:00
2. **HTTP Request** — GET `https://apart.guru/api/research/fetch-news`
   - Header: `x-n8n-secret: YOUR_SECRET`
3. (опционально) **Telegram** — уведомление о результате

## Изменить секрет

В `.env.local`:
```
NEXT_PUBLIC_N8N_SECRET=your_new_secret_here
```

## Добавить новый RSS-источник

В `src/lib/rss-parser.ts` в массив `RSS_FEEDS`:
```typescript
{ url: "https://example.ru/rss/", name: "Название источника" },
```

## Ключевые слова для фильтрации

В `src/lib/rss-parser.ts` в массив `KEYWORDS`:
- текущие: апартамент, аренда, недвижимость, инвестиц, доходност, новостройк, ипотека, ...
- добавляй частичные слова (стем) чтобы ловить все падежи
