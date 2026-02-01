#!/bin/bash

# Deploy script for Apart Guru

cd /Users/timofej3raze/apart-guru

# Add all changes
git add -A

# Commit with detailed message
git commit -m "Major update: realistic data, methodology on homepage, 4x logo

Database improvements:
- Add realistic-stats.ts with real Telegram data from 2024-2025
- 12 apartment-hotels with actual revenue statistics
- Detailed descriptions for each hotel
- Real data range from 3422₽/m² to 1147₽/m²

UI improvements:
- Enlarge header logo 4x (224x224px)
- Remove methodology page, add to homepage
- Remove image carousel from detail pages
- Improve image quality (quality=95)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push to remote
git push origin main

echo "✅ Deployed successfully!"
