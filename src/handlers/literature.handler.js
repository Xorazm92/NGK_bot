import bot from '../config/bot.js';
import { Literature } from '../model/index.js';

// bot.command('adabiyotlar', async (ctx) => {
//   try {
//     const literatures = await Literature.find({});
    
//     if (literatures.length === 0) {
//       return ctx.reply('Hozircha adabiyotlar mavjud emas.');
//     }

//     let message = 'Mavjud adabiyotlar:\n\n';
//     literatures.forEach((lit) => {
//       message += `📁 ${lit.name} - /download_${lit.id}\n`;
//     });

//     await ctx.reply(message);
//   } catch (error) {
//     console.error('Literature list error:', error);
//     await ctx.reply('Adabiyotlarni olishda xatolik.');
//   }
// });

// // Adabiyotni yuklab olish
// bot.hears(/^\/download_(.+)$/, async (ctx) => {
//   const literatureId = ctx.match[1];

//   try {
//     const literature = await Literature.findById(literatureId);

//     if (!literature) {
//       return ctx.reply('Kitob topilmadi.');
//     }

//     await ctx.replyWithDocument(literature.fileUrl, {
//       caption: literature.name
//     });
//   } catch (error) {
//     console.error('Literature download error:', error);
//     await ctx.reply('Kitobni yuklashda xatolik.');
//   }
// });
// export default bot;

bot.hears('Adabiyotlar', async (ctx) => {
  const adabiyotMenu = new Keyboard()
    .add('Qiziqarli ma\'lumotlar', 'Namunali blanklar')
    .row()
    .add('Video qo\'llanmalar', 'Kerakli hujjatlar')
    .row()
    .add('Ortga');

  await ctx.reply(
    `Adabiyotlar bo'limi:
Quyidagi bo'limlardan birini tanlang:`,
    { reply_markup: adabiyotMenu }
  );
});

bot.hears('Qiziqarli ma\'lumotlar', async (ctx) => {
  await ctx.reply(
    `Qiziqarli ma'lumotlar bo'limi. Bu yerda foydalanuvchilar uchun qiziqarli materiallar taqdim etiladi.`
  );
});

bot.hears('Ortga', async (ctx) => {
  await ctx.reply(
    `Asosiy menyuga qaytishingiz mumkin: /start`
  );
});

export default bot;