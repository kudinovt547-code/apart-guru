#!/bin/sh
# Apart Guru — Research Machine cron
# Runs every 6 hours, fetches news from RSS feeds and updates news.json

# Wait for app to be fully ready on startup
echo "[startup] Waiting 30s for app to be ready..."
sleep 30

while true; do
    echo "[$(date '+%Y-%m-%d %H:%M')] Fetching news from RSS feeds..."

    RESULT=$(wget -q -O- \
        --header="x-n8n-secret: $RESEARCH_SECRET" \
        "http://app:3000/api/research/fetch-news" 2>/dev/null)

    if [ -n "$RESULT" ]; then
        echo "$RESULT"
    else
        echo "  [warn] No response from app (might still be starting)"
    fi

    echo ""
    # Sleep 6 hours
    sleep 21600
done
