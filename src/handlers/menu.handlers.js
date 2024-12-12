import { Keyboard } from "grammy";
import User from "../models/user.js";
import {sendHomeMenu} from "../on/action.handler.js"

// **Tilni tanlash funksiyasi**
export const selectLang = async (ctx) => {
  await ctx.reply(`<b>Tilni tanlang / Пожалуйста, выберите язык:</b>`, {
    parse_mode: "HTML",
    reply_markup: new Keyboard()
      .text("🇺🇿 O'zbek tili")
      .text("🇷🇺 Русский")
      .row()
      .oneTime()
      .resized(),
  });
};

// **Tilni saqlash va bo'limlarni ko'rsatish funksiyasi**
export const saveLang = async (ctx, lang) => {
  const user_id = ctx?.update?.message?.from?.id;

  const data = await User.findOne({ user_id });
  if (!data) {
    const newUser = new User({ user_id, user_lang: lang });
    await newUser.save();
  } else {
    await User.updateOne({ user_id }, { user_lang: lang });
  }
  await sendHomeMenu(ctx, lang);
};

// **Foydalanuvchilar bo'limi**
export const userSection = async (ctx, lang) => {
  const keyboard =
    lang === "UZB"
      ? new Keyboard()
          .text("📞 Telefon raqamlar")
          .row()
          .text("🧑‍🤝‍🧑 Foydalanuvchi ro'yxati")
          .row()
          .text("⬅️ Orqaga")
          .oneTime()
          .resized()
      : new Keyboard()
          .text("📞 Телефонные номера")
          .row()
          .text("🧑‍🤝‍🧑 Список пользователей")
          .row()
          .text("⬅️ Назад")
          .oneTime()
          .resized();

  await ctx.reply(
    lang === "UZB"
      ? "<b>Foydalanuvchilar bo'limi:</b>"
      : "<b>Раздел Пользователи:</b>",
    { parse_mode: "HTML", reply_markup: keyboard }
  );
};

// **Murojaatlar bo'limi**
export const requestsSection = async (ctx, lang) => {
  const keyboard =
    lang === "UZB"
      ? new Keyboard()
          .text("📋 Murojaatlar haqida")
          .text("📝 Shikoyat va takliflar")
          .row()
          .text("⬅️ Orqaga")
          .oneTime()
          .resized()
      : new Keyboard()
          .text("📋 О запросах")
          .text("📝 Жалобы и предложения")
          .row()
          .text("⬅️ Назад")
          .oneTime()
          .resized();

  await ctx.reply(
    lang === "UZB" ? "<b>Murojaatlar bo'limi:</b>" : "<b>Раздел Запросы:</b>",
    { parse_mode: "HTML", reply_markup: keyboard }
  );
};

// **Adabiyotlar bo'limi**
export const literatureSection = async (ctx, lang) => {
  const keyboard =
    lang === "UZB"
      ? new Keyboard()
          .text("📚 Qiziqarli ma'lumotlar")
          .text("📝 Namunaliy blanklar")
          .row()
          .text("📄 Kerakli hujjatlar")
          .text("📹 Video qo'llanmalar")
          .row()
          .text("⬅️ Orqaga")
          .oneTime()
          .resized()
      : new Keyboard()
          .text("📚 Интересные данные")
          .text("📝 Шаблоны")
          .row()
          .text("📄 Необходимые документы")
          .text("📹 Видео-руководства")
          .row()
          .text("⬅️ Назад")
          .oneTime()
          .resized();

  await ctx.reply(
    lang === "UZB"
      ? "<b>Adabiyotlar bo'limi:</b>"
      : "<b>Раздел Литература:</b>",
    { parse_mode: "HTML", reply_markup: keyboard }
  );
};

// **Xabarlar bo'limi**
export const messagesSection = async (ctx, lang) => {
  const keyboard =
    lang === "UZB"
      ? new Keyboard()
          .text("📞 CALL markaz")
          .text("📝 Edo.ijro.uzdagi eng ko‘p xatoliklar")
          .row()
          .text("⬅️ Orqaga")
          .oneTime()
          .resized()
      : new Keyboard()
          .text("📞 CALL центр")
          .text("📝 Наиболее частые ошибки на Edo.ijro.uz")
          .row()
          .text("⬅️ Назад")
          .oneTime()
          .resized();

  await ctx.reply(
    lang === "UZB" ? "<b>Xabarlar bo'limi:</b>" : "<b>Раздел Сообщения:</b>",
    { parse_mode: "HTML", reply_markup: keyboard }
  );
};
