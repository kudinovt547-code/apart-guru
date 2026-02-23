#!/bin/sh
# Apart Guru — Research Machine cron
# Runs every 6 hours:
#   1. Fetch news from RSS feeds → news.json
#   2. Fetch Telegram mentions per project → project-mentions/{slug}.json

# Wait for app to be fully ready on startup
echo "[startup] Waiting 60s for app to be ready..."
sleep 60

while true; do
    echo "[$(date '+%Y-%m-%d %H:%M')] === Research cycle start ==="

    echo "[$(date '+%Y-%m-%d %H:%M')] Fetching RSS news..."
    RESULT=$(wget -q -O- "http://app:3000/api/research/fetch-news" 2>/dev/null)
    if [ -n "$RESULT" ]; then
        echo "$RESULT"
    else
        echo "  [warn] No response from fetch-news"
    fi

    echo "[$(date '+%Y-%m-%d %H:%M')] Fetching project mentions (Telegram)..."
    RESULT2=$(wget -q -O- "http://app:3000/api/research/fetch-project-mentions" 2>/dev/null)
    if [ -n "$RESULT2" ]; then
        echo "$RESULT2"
    else
        echo "  [warn] No response from fetch-project-mentions"
    fi

    echo "[$(date '+%Y-%m-%d %H:%M')] === Research cycle done. Next in 6h ==="
    echo ""

    # Sleep 6 hours
    sleep 21600
done
