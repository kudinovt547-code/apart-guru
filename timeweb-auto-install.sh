#!/bin/bash
set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Apart Guru - Автоматическая установка${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Проверка что запущено от root
if [ "$EUID" -ne 0 ]; then
   echo -e "${RED}Ошибка: Запустите скрипт от root${NC}"
   exit 1
fi

# Получение публичного IP
PUBLIC_IP=$(curl -s ifconfig.me)
echo -e "${YELLOW}Публичный IP сервера: ${PUBLIC_IP}${NC}"
echo ""

# Шаг 1: Обновление системы
echo -e "${GREEN}[1/10] Обновление системы...${NC}"
apt update -y > /dev/null 2>&1
apt upgrade -y > /dev/null 2>&1
echo -e "${GREEN}✓ Система обновлена${NC}"

# Шаг 2: Установка необходимых пакетов
echo -e "${GREEN}[2/10] Установка Git и других пакетов...${NC}"
apt install -y git curl nano > /dev/null 2>&1
echo -e "${GREEN}✓ Пакеты установлены${NC}"

# Шаг 3: Проверка Docker
echo -e "${GREEN}[3/10] Проверка Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker не найден, устанавливаю...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh > /dev/null 2>&1
    rm get-docker.sh
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose не найден, устанавливаю...${NC}"
    apt install -y docker-compose > /dev/null 2>&1
fi
echo -e "${GREEN}✓ Docker готов${NC}"

# Шаг 4: Клонирование проекта
echo -e "${GREEN}[4/10] Клонирование проекта...${NC}"
cd /root
if [ -d "apart-guru" ]; then
    echo -e "${YELLOW}Папка apart-guru уже существует, обновляю...${NC}"
    cd apart-guru
    git pull origin main > /dev/null 2>&1
else
    git clone https://github.com/kudinovt547-code/apart-guru.git > /dev/null 2>&1
    cd apart-guru
fi
echo -e "${GREEN}✓ Проект клонирован${NC}"

# Шаг 5: Создание .env файла
echo -e "${GREEN}[5/10] Создание .env файла...${NC}"
cat > .env << 'EOF'
NODE_ENV=production
TELEGRAM_BOT_TOKEN=8243224581:AAHUDmrM5J9FqNypKj054bfLnb0IhxditsE
TELEGRAM_CHAT_ID=6690830842
EOF
echo -e "${GREEN}✓ .env создан${NC}"

# Шаг 6: Сборка и запуск Docker
echo -e "${GREEN}[6/10] Сборка Docker образа (это займет 5-10 минут)...${NC}"
docker-compose build
echo -e "${GREEN}✓ Образ собран${NC}"

echo -e "${GREEN}[7/10] Запуск контейнера...${NC}"
docker-compose up -d
sleep 5
echo -e "${GREEN}✓ Контейнер запущен${NC}"

# Проверка что контейнер работает
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓ Приложение работает на порту 3000${NC}"
else
    echo -e "${RED}✗ Ошибка запуска контейнера${NC}"
    docker-compose logs
    exit 1
fi

# Шаг 7: Установка Nginx
echo -e "${GREEN}[8/10] Установка и настройка Nginx...${NC}"
apt install -y nginx > /dev/null 2>&1

# Создание конфигурации Nginx
cat > /etc/nginx/sites-available/apart-guru << 'EOF'
server {
    listen 80;
    server_name apart.guru www.apart.guru;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/apart-guru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t > /dev/null 2>&1
systemctl restart nginx
systemctl enable nginx > /dev/null 2>&1
echo -e "${GREEN}✓ Nginx настроен${NC}"

# Шаг 8: Настройка Firewall
echo -e "${GREEN}[9/10] Настройка Firewall...${NC}"
ufw allow 22/tcp > /dev/null 2>&1
ufw allow 80/tcp > /dev/null 2>&1
ufw allow 443/tcp > /dev/null 2>&1
ufw --force enable > /dev/null 2>&1
echo -e "${GREEN}✓ Firewall настроен${NC}"

# Шаг 9: Информация о DNS
echo -e "${GREEN}[10/10] Установка завершена!${NC}"
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ УСТАНОВКА ЗАВЕРШЕНА УСПЕШНО!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Следующие шаги:${NC}"
echo ""
echo -e "${YELLOW}1. Настройте DNS домена apart.guru:${NC}"
echo "   Тип: A"
echo "   Имя: @"
echo "   Значение: ${PUBLIC_IP}"
echo "   TTL: 3600"
echo ""
echo "   Тип: A"
echo "   Имя: www"
echo "   Значение: ${PUBLIC_IP}"
echo "   TTL: 3600"
echo ""
echo -e "${YELLOW}2. Подождите 10-30 минут для распространения DNS${NC}"
echo ""
echo -e "${YELLOW}3. Проверьте что домен указывает на сервер:${NC}"
echo "   nslookup apart.guru"
echo ""
echo -e "${YELLOW}4. После настройки DNS установите SSL сертификат:${NC}"
echo "   apt install certbot python3-certbot-nginx -y"
echo "   certbot --nginx -d apart.guru -d www.apart.guru"
echo ""
echo -e "${GREEN}Полезные команды:${NC}"
echo "   docker-compose logs -f      # Логи приложения"
echo "   docker-compose restart      # Перезапуск"
echo "   systemctl restart nginx     # Перезапуск Nginx"
echo "   cd /root/apart-guru         # Перейти в папку проекта"
echo ""
echo -e "${GREEN}Сайт доступен на http://${PUBLIC_IP}${NC}"
echo -e "${GREEN}После настройки DNS: https://apart.guru${NC}"
echo ""
