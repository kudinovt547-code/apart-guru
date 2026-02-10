#!/bin/bash
set -e

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Установка SSL сертификата для Apart Guru${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Проверка что certbot установлен
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}Certbot не найден, устанавливаю...${NC}"
    apt update
    apt install -y certbot python3-certbot-nginx
    echo -e "${GREEN}✓ Certbot установлен${NC}"
else
    echo -e "${GREEN}✓ Certbot уже установлен${NC}"
fi

echo ""
echo -e "${YELLOW}Проверка DNS записей...${NC}"

# Проверка DNS
DOMAIN_IP=$(dig +short apart.guru | head -n1)
SERVER_IP=$(curl -4 -s ifconfig.me)

echo "Домен apart.guru указывает на: $DOMAIN_IP"
echo "IP сервера (IPv4): $SERVER_IP"

if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
    echo -e "${YELLOW}⚠️  Внимание: IP не совпадают, но продолжаем...${NC}"
    echo -e "${YELLOW}(Возможно сервер использует IPv6)${NC}"
else
    echo -e "${GREEN}✓ DNS настроен правильно${NC}"
fi
echo ""

# Получение SSL сертификата
echo -e "${GREEN}Получение SSL сертификата от Let's Encrypt...${NC}"
echo ""

certbot --nginx \
    -d apart.guru \
    -d www.apart.guru \
    --non-interactive \
    --agree-tos \
    --email kudinovt547@gmail.com \
    --redirect

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ SSL СЕРТИФИКАТ УСТАНОВЛЕН!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${GREEN}Ваш сайт теперь доступен по HTTPS:${NC}"
echo "  https://apart.guru"
echo "  https://www.apart.guru"
echo ""
echo -e "${YELLOW}Автопродление сертификата настроено${NC}"
echo "Certbot автоматически обновит сертификат за 30 дней до истечения"
echo ""
echo -e "${GREEN}Проверка статуса Nginx:${NC}"
systemctl status nginx --no-pager
echo ""
