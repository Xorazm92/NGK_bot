import bot from '../config/bot.js';
import { Inquiry } from '../model/index.js';

bot.on('message', async (ctx) => {
  try {
    const { id } = ctx.from || {};
    const message = ctx.message?.text;

    if (!id || !message) {
      return ctx.reply('Xabar yuborishda xatolik.');
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



// bot.on('message', async (ctx) => {
//   try {
//     const { id } = ctx.from || {};
//     const message = ctx.message?.text;

//     // Faqat oddiy foydalanuvchi xabarlarini qayta ishlang
//     if (!id || !message || ['/start', 'Foydalanuvchilar', 'Murojaatlar', 'Adabiyotlar', 'Xabarlar'].includes(message)) {
//       return; // Agar xabar tugma yoki komanda bo'lsa, ishlov bermang
//     }

//     const inquiry = new Inquiry({
//       userId: id,
//       message: message
//     });

//     await inquiry.save();

//     await ctx.reply('Murojatingiz qabul qilindi. Tez orada operatorlarimiz siz bilan bog\'lanishadi.');
//   } catch (error) {
//     console.error('Message handler error:', error);
//     await ctx.reply('Xabarni saqlashda xatolik.');
//   }
// });
// export default bot;