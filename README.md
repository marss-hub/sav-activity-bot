# Telegram-бот для мониторинга активности игрового сервера #

## Цель: ##
Создать бота, который будет уведомлять об активности (значительном количестве человек) на сервере в онлайн-игре. Такой запрос связан с тем, что данная игра в силу исторических причин имеет нестабильный онлайн - в течении дня на сервере может быть от 0 до 5 игроков, и только в некоторые моменты количество игрроков возрастает до 20-40, и такие матчи являются наиболее ценными и интересными.

## Функционал: ##
Данный бот следит за количеством игроков онлайн на сервере игры SavageDRX и выполняет две основные задачи:

1. С помощью команд предоставляет в чат телеграм информацию о текущем количестве игроков онлайн и о текущей карте, которая играется на сервере.
2. Когда количество игроков на сервере превышает 20 бот присылает уведомление и делает так каждые 30 минут, пока количество игроков на сервере превышает 20.

## Реализация: ##
Бот написн с использованием популярной библиотеки [Node.js Telegram Bot API](https://www.npmjs.com/package/node-telegram-bot-api)

Для запуска необходима NodeJS версии не ниже Node v22.11.0 (LTS)
Также рекомендуется использовать [менеджер процессов PM2](https://www.npmjs.com/package/pm2)

## Ссылки и примеры: ##
Ссылка на бот: [https://t.me/Coronavirus_Public_bot](https://t.me/Coronavirus_Public_bot)  
Username бота: @Coronavirus_Public_bot

[Веб-версия текущего онлайна сервера](https://savagedrx.com/servers/89.39.105.27:11235)  
[Статистика 7-дневного онлайна сервера](https://savagedrx.com/online)
