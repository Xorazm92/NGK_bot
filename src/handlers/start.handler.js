

import bot from '../config/bot.js';
import { User } from '../model/index.js';

// // Start komandasi
// export const setupCommands = (bot) => {
//   const mainMenu = new Keyboard()
//     .add('Foydalanuvchilar', 'Murojaatlar')
//     .row()
//     .add('Adabiyotlar', 'Xabarlar');

//   bot.command('start', async (ctx) => {
//     await ctx.reply(
//       `Assalomu alaykum! Quyidagi bo'limlardan birini tanlang:`,
//       { reply_markup: mainMenu }
//     );
//   });

//   // Foydalanuvchilar
//   bot.hears('Foydalanuvchilar', async (ctx) => {
//     await ctx.reply(
//       `Foydalanuvchilar bo'limida siz quyidagi ma'lumotlarni boshqarishingiz mumkin:
// - Foydalanuvchilar ma'lumotlari (id, username, telefon raqami).`
//     );
//     handleUsers(bot); // Foydalanuvchilar funksiyasi
//   });

//   // Murojaatlar
//   bot.hears('Murojaatlar', async (ctx) => {
//     await ctx.reply(
//       `Murojaatlar bo'limida quyidagi ma'lumotlar boshqariladi:
// - Foydalanuvchi ID
// - Murojaat mazmuni.`
//     );
//     handleAppeals(bot); // Murojaatlar funksiyasi
//   });

//   // Adabiyotlar
//   bot.hears('Adabiyotlar', async (ctx) => {
//     await ctx.reply(
//       `Adabiyotlar bo'limida quyidagi ma'lumotlar boshqariladi:
// - Nomi
// - Fayl joylashuvi.`
//     );
//     handleLiterature(bot); // Adabiyotlar funksiyasi
//   });

//   // Xabarlar
//   bot.hears('Xabarlar', async (ctx) => {
//     await ctx.reply(
//       `Xabarlar bo'limida quyidagi ma'lumotlar boshqariladi:
// - Foydalanuvchi ID
// - Xabar matni.`
//     );
//     handleMessages(bot); // Xabarlar funksiyasi
//   });
// };

// // Foydalanuvchilar funksiyasi
// const handleUsers = (bot) => {
//   bot.on('text', async (ctx) => {
//     await ctx.reply('Foydalanuvchilar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
//   });
// };

// // Murojaatlar funksiyasi
// const handleAppeals = (bot) => {
//   bot.on('text', async (ctx) => {
//     await ctx.reply('Murojaatlar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
//   });
// };

// // Adabiyotlar funksiyasi
// const handleLiterature = (bot) => {
//   bot.on('text', async (ctx) => {
//     await ctx.reply('Adabiyotlar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
//   });
// };

// // Xabarlar funksiyasi
// const handleMessages = (bot) => {
//   bot.on('text', async (ctx) => {
//     await ctx.reply('Xabarlar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
//   });
// };


import { Keyboard } from 'grammy';


// **Tilni tanlash funksiyasi**
export const selectLang = async (ctx) => {
  await ctx.reply(`<b>Tilni tanlang / Select language:</b>`, {
    parse_mode: 'HTML',
    reply_markup: new Keyboard()
      .text("🇺🇿 O'zbek tili")
      .text('🇬🇧 English')
      .row()
      .oneTime()
      .resized(),
  });
};

// **Tilni saqlash va bo'limlarni ko'rsatish funksiyasi**
export const saveLang = async (ctx, lang) => {
  const user_id = ctx?.update?.message?.from?.id;
  const user = await User.findOne({ user_id });

  if (!user) {
    await selectLang(ctx); // Agar foydalanuvchi bo'lmasa, tilni tanlashga qaytaradi
  } else {
    await User.updateOne({ user_id }, { user_lang: lang }); // Foydalanuvchi tilini yangilaydi

    // **Asosiy menyuni ko'rsatish**
    const mainMenu = new Keyboard()
      .add('Foydalanuvchilar', 'Murojaatlar')
      .row()
      .add('Adabiyotlar', 'Xabarlar');

    if (lang === 'UZB') {
      await ctx.reply('<b>Bosh sahifa!</b>', {
        parse_mode: 'HTML',
        reply_markup: mainMenu,
      });
    } else if (lang === 'ENG') {
      await ctx.reply('<b>Home page</b>', {
        parse_mode: 'HTML',
        reply_markup: mainMenu,
      });
    }
  }
};

// **Asosiy komandalar**
export const setupCommands = (bot) => {
  // **Start komandasi**
  bot.command('start', async (ctx) => {
    await selectLang(ctx);
  });

  // **Tilni o'zgartirish**
  bot.hears('♻️ Tilni o‘zgartirish', async (ctx) => {
    await selectLang(ctx);
  });

  // **Foydalanuvchilar bo'limi**
  bot.hears('Foydalanuvchilar', async (ctx) => {
    await ctx.reply(
      `Foydalanuvchilar bo'limida quyidagi ma'lumotlarni boshqarishingiz mumkin:
- Foydalanuvchilar ma'lumotlari (id, username, telefon raqami).`
    );
    handleUsers(bot);
  });

  // **Murojaatlar bo'limi**
  bot.hears('Murojaatlar', async (ctx) => {
    await ctx.reply(
      `Murojaatlar bo'limida quyidagi ma'lumotlar boshqariladi:
- Foydalanuvchi ID
- Murojaat mazmuni.`
    );
    handleAppeals(bot);
  });

  // **Adabiyotlar bo'limi**
  bot.hears('Adabiyotlar', async (ctx) => {
    await ctx.reply(
      `Adabiyotlar bo'limida quyidagi ma'lumotlar boshqariladi:
- Nomi
- Fayl joylashuvi.`
    );
    handleLiterature(bot);
  });

  // **Xabarlar bo'limi**
  bot.hears('Xabarlar', async (ctx) => {
    await ctx.reply(
      `Xabarlar bo'limida quyidagi ma'lumotlar boshqariladi:
- Foydalanuvchi ID
- Xabar matni.`
    );
    handleMessages(bot);
  });
};

// **Qo'shimcha bo'limlar uchun funksiyalar**
const handleUsers = (bot) => {
  bot.on('text', async (ctx) => {
    await ctx.reply('Foydalanuvchilar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
  });
};

const handleAppeals = (bot) => {
  bot.on('text', async (ctx) => {
    await ctx.reply('Murojaatlar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
  });
};

const handleLiterature = (bot) => {
  bot.on('text', async (ctx) => {
    await ctx.reply('Adabiyotlar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
  });
};

const handleMessages = (bot) => {
  bot.on('text', async (ctx) => {
    await ctx.reply('Xabarlar bilan bog‘liq qo‘shimcha funksiyalar shu yerda amalga oshiriladi.');
  });
};
