import bot from "../config/bot.js";
import {
  userSection,
  requestsSection,
  literatureSection,
  messagesSection,
  selectLang,
  saveLang,
} from "../handlers/menu.handlers.js";
import User from "../models/user.js";
import { Keyboard } from "grammy";

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text; 
  const user_id = ctx.update.message.from.id;

  let user = await User.findOne({ user_id });

  if (!user) {
    const newUser = new User({
      user_id: user_id,
      username: ctx.from.username || "", 
      first_name: ctx.from.first_name || "", 
      last_name: ctx.from.last_name || "", 
    });

    await newUser.save();
    return await selectLang(ctx); 

  //   await selectLang(ctx);
  // } else {
  //   await saveLang(ctx, user.user_lang);
  }
    
  const lang = user?.user_lang || "UZB"; 

  
  if (text === "🇺🇿 O'zbekcha") {
    await saveLang(ctx, "UZB"); 
    return await sendHomeMenu(ctx, "UZB"); 
  } else if (text === "🇷🇺 Русский") {
    await saveLang(ctx, "RUS"); 
    return await sendHomeMenu(ctx, "RUS"); 
  }

  switch (text) {
    case "🗃️ Adabiyotlar":
    case "🗃 Литература":
      await literatureSection(ctx, lang);
      break;

    case "📚 Qiziqarli ma'lumotlar":
    case "📚 Интересные данные":
      await ctx.reply(
        lang === "UZB"
          ? "Qiziqarli ma'lumotlar bo'limi hali to'ldirilmagan."
          : "Раздел интересных данных еще не заполнен."
      );
      break;

    case "📝 Namunali blanklar":
    case "📝 Шаблоны":
      await ctx.reply(
        lang === "UZB"
          ? "Namunali blanklar bo'limi hali to'ldirilmagan."
          : "Раздел шаблонов еще не заполнен."
      );
      break;

    case "📄 Kerakli hujjatlar":
    case "📄 Необходимые документы":
      await ctx.reply(
        lang === "UZB"
          ? "Kerakli hujjatlar bo'limi hali to'ldirilmagan."
          : "Раздел необходимых документов еще не заполнен."
      );
      break;

    case "📹 Video qo'llanmalar":
    case "📹 Видео-руководства":
      await ctx.reply(
        lang === "UZB"
          ? "Video qo'llanmalar bo'limi hali to'ldirilmagan."
          : "Раздел видео-руководств еще не заполнен."
      );
      break;

    case "📣 Xabarlar":
    case "📣 Объявления":
      await messagesSection(ctx, lang);
      break;

    case "🪧 Murojaatlar":
    case "🪧 Запросы":
      await requestsSection(ctx, lang);
      break;

    case "🧑🏾‍🤝‍🧑🏾 Foydalanuvchilar":
    case "🧑🏾‍🤝‍🧑🏾 Пользователи":
      await userSection(ctx, lang);
      break;

    case "♻️ Tilni o'zgartirish":
    case "♻️ Изменить язык":
      await selectLang(ctx);
      break;
    
    case "🇺🇿 O'zbek tili":
      await saveLang(ctx, "UZB");
      break;

    case "🇷🇺 Русский":
      await saveLang(ctx, "RUS");
      break;

    case "⬅️ Orqaga":
    case "⬅️ Назад":
      await sendHomeMenu(ctx, lang);
      break;

    default:
      await ctx.reply(
        lang === "UZB"
          ? "Mavjud bo'lmagan buyruq. Iltimos, menyudan tanlang."
          : "Неизвестная команда. Пожалуйста, выберите из меню."
      );
      await sendHomeMenu(ctx, lang); 
      break;
  }
});

// **Bosh menyuni jo'natish funksiyasi**
export const sendHomeMenu = async (ctx, lang) => {
  const keyboard =
    lang === "UZB"
      ? new Keyboard()
          .text("🗃️ Adabiyotlar")
          .text("📣 Xabarlar")
          .row()
          .text("🪧 Murojaatlar")
          .text("🧑🏾‍🤝‍🧑🏾 Foydalanuvchilar")
          .row()
          .text("♻️ Tilni o'zgartirish")
          .row()
          .oneTime()
          .resized()
      : new Keyboard()
          .text("🗃 Литература")
          .text("📣 Объявления")
          .row()
          .text("🪧 Запросы")
          .text("🧑🏾‍🤝‍🧑🏾 Пользователи")
          .row()
          .text("♻️ Изменить язык")
          .row()
          .oneTime()
          .resized();

  await ctx.reply(
    lang === "UZB" ? "<b>Bosh sahifa!</b>" : "<b>Главная страница!</b>",
    { parse_mode: "HTML", reply_markup: keyboard }
  );
};
