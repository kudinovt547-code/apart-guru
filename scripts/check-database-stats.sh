#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📊 Apart Guru Database Statistics${NC}\n"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq is not installed. Installing via Homebrew...${NC}"
    brew install jq
fi

DB_FILE="data/content/stats.generated.json"

if [ ! -f "$DB_FILE" ]; then
    echo -e "${YELLOW}❌ Database file not found: $DB_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Database file found${NC}\n"

# Source info
echo -e "${BLUE}📅 Source Information:${NC}"
cat $DB_FILE | jq -r '.sources | "  Updated: \(.updatedAt)\n  Source: \(.source)"'
echo ""

# Total count
TOTAL=$(cat $DB_FILE | jq '.objects | length')
echo -e "${BLUE}📈 Total Objects: ${GREEN}${TOTAL}${NC}"

# Status breakdown
ACTIVE=$(cat $DB_FILE | jq '[.objects[] | select(.status == "active")] | length')
CONSTRUCTION=$(cat $DB_FILE | jq '[.objects[] | select(.status == "construction")] | length')
echo -e "  ${GREEN}●${NC} Active: ${ACTIVE}"
echo -e "  ${YELLOW}●${NC} Construction: ${CONSTRUCTION}"
echo ""

# Cities
echo -e "${BLUE}📍 Cities:${NC}"
cat $DB_FILE | jq -r '[.objects[] | {city, status}] | group_by(.city) | .[] | "  \(.[0].city): \(length) objects"' | sort -rn -k2
echo ""

# Top 10 by revenue per m2
echo -e "${BLUE}🏆 Top 10 by Revenue (₽/м²/мес):${NC}"
cat $DB_FILE | jq -r '[.objects[] | select(.status == "active" and .revPerM2Month > 0)] | sort_by(-.revPerM2Month) | .[0:10] | to_entries[] | "\(.key + 1). \(.value.title) (\(.value.city)) — \(.value.revPerM2Month | round) ₽/м²/мес | \(.value.paybackYears | round) лет"'
echo ""

# Average metrics
echo -e "${BLUE}📊 Average Metrics (Active Objects):${NC}"
AVG_PRICE=$(cat $DB_FILE | jq '[.objects[] | select(.status == "active") | .price] | add / length | round')
AVG_AREA=$(cat $DB_FILE | jq '[.objects[] | select(.status == "active") | .area] | add / length | round')
AVG_REV=$(cat $DB_FILE | jq '[.objects[] | select(.status == "active") | .revPerM2Month] | add / length | round')
AVG_PAYBACK=$(cat $DB_FILE | jq '[.objects[] | select(.status == "active") | .paybackYears] | add / length | round')
AVG_OCC=$(cat $DB_FILE | jq '[.objects[] | select(.status == "active") | .occupancy] | add / length | round')

echo -e "  Price: $(printf "%'d" $AVG_PRICE) ₽"
echo -e "  Area: ${AVG_AREA} m²"
echo -e "  Revenue: ${AVG_REV} ₽/m²/month"
echo -e "  Payback: ${AVG_PAYBACK} years"
echo -e "  Occupancy: ${AVG_OCC}%"
echo ""

echo -e "${GREEN}✓ Database check complete!${NC}"
