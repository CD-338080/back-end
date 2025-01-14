const { Bot, session } = require('grammy');
const { WebAppData } = require('@grammyjs/web-app');

// Initialize your bot with your bot token
const bot = new Bot('8103399462:AAFBJ4BVbt716X58dXgY86J1SGjckBNwX8k');

// Add session middleware
bot.use(session());

// Handle the /start command
bot.command('start', async (ctx) => {
  await ctx.reply('Welcome to Mini Trader!', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Open Web App",
          web_app: { url: "YOUR_WEBAPP_URL" }
        }
      ]]
    }
  });
});

// Handle web app data
bot.on('message:web_app_data', async (ctx) => {
  const data = ctx.message.web_app_data.data;
  // Handle the data received from your web app
  console.log('Received web app data:', data);
});

// Start the bot
bot.start();