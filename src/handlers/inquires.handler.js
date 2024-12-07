import bot from '../config/bot.js';
import { Inquiry } from '../model/index.js';

// /start komandasi
bot.command('start', async (ctx) => {
  await ctx.reply(
    `Assalomu alaykum! Quyidagi bo'limlardan birini tanlang:`,
    {
      reply_markup: {
        keyboard: [
          ['Foydalanuvchilar', 'Murojaatlar'],
          ['Adabiyotlar', 'Xabarlar']
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    }
  );
});

// Foydalanuvchilar tugmasi
bot.hears('Foydalanuvchilar', async (ctx) => {
  await ctx.reply('Foydalanuvchilarni tanladingiz!');
});

// Murojaatlar tugmasi
bot.hears('Murojaatlar', async (ctx) => {
  await ctx.reply('Murojaatlar bo\'limiga xush kelibsiz.');
});

// Adabiyotlar tugmasi
bot.hears('Adabiyotlar', async (ctx) => {
  await ctx.reply('Adabiyotlar bo\'limiga xush kelibsiz.');
});

// Xabarlar tugmasi
bot.hears('Xabarlar', async (ctx) => {
  await ctx.reply('Xabarlar bo\'limiga xush kelibsiz.');
});

// Barcha boshqa foydalanuvchi xabarlarini qayta ishlash
bot.on('message', async (ctx) => {
  try {
    const { id } = ctx.from || {};
    const message = ctx.message?.text;

    // Faqat boshqa xabarlarni qayta ishlang
    if (!id || !message || ['/start', 'Foydalanuvchilar', 'Murojaatlar', 'Adabiyotlar', 'Xabarlar'].includes(message)) {
      return; // Komanda yoki tugmalarni o'tkazib yuborish
    }

    const inquiry = new Inquiry({
      userId: id,
      message: message
    });

    await inquiry.save();

    await ctx.reply('Murojatingiz qabul qilindi. Tez orada operatorlarimiz siz bilan bog\'lanishadi.');
  } catch (error) {
    console.error('Message handler error:', error);
    await ctx.reply('Xabarni saqlashda xatolik.');
  }
});
export default bot;