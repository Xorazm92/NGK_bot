import { Bot } from 'grammy';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN || '');

bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error('Bot error:', error);
    await ctx.reply('Kechirasiz, nosozlik yuz berdi.');
  }
});

export default bot;