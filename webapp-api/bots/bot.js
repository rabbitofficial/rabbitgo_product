const TelegramBot = require('node-telegram-bot-api');


const token = '';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];

    bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const keyboard = {
        inline_keyboard: [
            [{
                text: 'Connect Wallet',
                web_app : {
                    "url": ""

                }
            }]
        ]
    };

    bot.sendPhoto(chatId, `https://rabbitgochain.s3.ap-northeast-1.amazonaws.com/logo_main.png`,
    {
        caption : "<b>Welcome to the RabbitGo Community Bot. Please tap the button below to make a request: </b> \n",
        parse_mode: 'HTML',
        reply_markup: keyboard
    });

});