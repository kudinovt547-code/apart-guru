# Развертывание Apart Guru на VK Cloud

## Шаг 1: Регистрация в VK Cloud

1. Перейдите на https://cloud.vk.com/
2. Зарегистрируйтесь или войдите через VK
3. Получите бесплатные бонусы для тестирования

## Шаг 2: Создание виртуальной машины

1. В панели VK Cloud → **Облачные вычисления** → **Виртуальные машины**
2. Нажмите **Создать инстанс**
3. Выберите конфигурацию:
   - **ОС**: Ubuntu 22.04 LTS
   - **Конфигурация**: Standard-2 (2 vCPU, 4 GB RAM) - достаточно для старта
   - **Диск**: 20 GB SSD
4. **Сеть**: Выберите или создайте сеть с публичным IP
5. **SSH ключ**: Создайте или загрузите свой публичный ключ
6. Создайте инстанс

## Шаг 3: Подключение к серверу

```bash
ssh ubuntu@<ваш-публичный-IP>
```

## Шаг 4: Установка Docker на сервере

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установка Docker Compose
sudo apt install docker-compose -y

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Перелогиньтесь для применения изменений
exit
```

Подключитесь снова:
```bash
ssh ubuntu@<ваш-публичный-IP>
```

## Шаг 5: Клонирование проекта

```bash
# Установка Git (если нужно)
sudo apt install git -y

# Клонирование репозитория
git clone https://github.com/kudinovt547-code/apart-guru.git
cd apart-guru
```

## Шаг 6: Настройка переменных окружения

```bash
# Создайте файл .env
nano .env
```

Добавьте:
```env
NODE_ENV=production
TELEGRAM_BOT_TOKEN=8243224581:AAHUDmrM5J9FqNypKj054bfLnb0IhxditsE
TELEGRAM_CHAT_ID=6690830842
```

Сохраните (Ctrl+O, Enter, Ctrl+X)

## Шаг 7: Сборка и запуск Docker контейнера

```bash
# Сборка образа (займет 5-10 минут)
docker-compose build

# Запуск контейнера
docker-compose up -d

# Проверка статуса
docker-compose ps
docker-compose logs -f
```

## Шаг 8: Настройка Nginx (реверс-прокси)

```bash
# Установка Nginx
sudo apt install nginx -y

# Создание конфигурации
sudo nano /etc/nginx/sites-available/apart-guru
```

Добавьте:
```nginx
server {
    listen 80;
    server_name apart.guru www.apart.guru;

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
```

Активируйте конфигурацию:
```bash
sudo ln -s /etc/nginx/sites-available/apart-guru /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Шаг 9: Установка SSL сертификата (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получение сертификата
sudo certbot --nginx -d apart.guru -d www.apart.guru
```

Следуйте инструкциям Certbot.

## Шаг 10: Настройка автообновления

Создайте скрипт для обновления:
```bash
nano ~/update-apart-guru.sh
```

Содержимое:
```bash
#!/bin/bash
cd /home/ubuntu/apart-guru
git pull origin main
docker-compose down
docker-compose build
docker-compose up -d
echo "Updated at $(date)" >> /home/ubuntu/update.log
```

Сделайте исполняемым:
```bash
chmod +x ~/update-apart-guru.sh
```

## Шаг 11: Настройка DNS

В панели управления вашего регистратора домена добавьте:
```
Тип: A
Имя: @
Значение: <публичный-IP-вашего-сервера>
TTL: 3600

Тип: A
Имя: www
Значение: <публичный-IP-вашего-сервера>
TTL: 3600
```

## Шаг 12: Проверка

Подождите 5-15 минут для распространения DNS, затем:
```bash
# Откройте в браузере (без VPN):
https://apart.guru
```

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск контейнера
docker-compose restart

# Остановка
docker-compose down

# Обновление кода
cd ~/apart-guru
git pull origin main
docker-compose up -d --build

# Проверка статуса Nginx
sudo systemctl status nginx

# Перезапуск Nginx
sudo systemctl restart nginx
```

## Мониторинг

```bash
# Использование ресурсов
docker stats

# Логи Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Стоимость

Примерная стоимость:
- VM Standard-2 (2 vCPU, 4GB RAM): ~1500₽/мес
- Публичный IP: ~200₽/мес
- Трафик: обычно бесплатно до определенного лимита

**Итого**: ~1700₽/месяц

## Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs`
2. Проверьте статус: `docker-compose ps`
3. Проверьте Nginx: `sudo nginx -t`
4. Проверьте firewall: `sudo ufw status`

---

**Готово!** Ваш сайт работает без VPN на российском хостинге.
