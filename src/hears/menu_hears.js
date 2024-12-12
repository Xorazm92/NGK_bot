import { bot } from "../config/bot.js";
import { userSection, requestsSection, literatureSection, messagesSection, selectLang, saveLang } from "../handlers/menu.handlers.js";
import { Keyboard } from "grammy";
import User from "../models/user.js";
import { sendHomeMenu } from "../on/action.handler.js";



bot.hears("🇺🇿 O'zbek tili", async (ctx) => {
    console.log('menu_hears')
    await saveLang(ctx, 'UZB');
});

bot.hears('🇷🇺 Русский', async (ctx) => {
    await saveLang(ctx, 'RUS');
});


bot.hears("🗃️ Adabiyotlar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB"; 
    console.log(literatureSection);
    
    await literatureSection(ctx, lang);
});

bot.hears("📣 Xabarlar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB"; 

    await messagesSection(ctx, lang);
});

bot.hears("🪧 Murojaatlar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await requestsSection(ctx, lang);
});

bot.hears("🧑🏾‍🤝‍🧑🏾 Foydalanuvchilar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB"; 

    await userSection(ctx, lang);
});

bot.hears("📚 Qiziqarli ma'lumotlar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Qiziqarli ma'lumotlar bo'limi hali to'ldirilmagan." : "Раздел интересных данных еще не заполнен."
    );
});

bot.hears("📝 Namunali blanklar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Namunali blanklar bo'limi hali to'ldirilmagan." : "Раздел шаблонов еще не заполнен."
    );
});

bot.hears("📄 Kerakli hujjatlar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Kerakli hujjatlar bo'limi hali to'ldirilmagan." : "Раздел необходимых документов еще не заполнен."
    );
});

bot.hears("📹 Video qo'llanmalar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Video qo'llanmalar bo'limi hali to'ldirilmagan." : "Раздел видео-руководств еще не заполнен."
    );
});


bot.hears("📞 CALL markaz", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "CALL markaz bo'limi hali to'ldirilmagan." : "CALL центр еще не заполнен."
    );
});

bot.hears("📝 Edo.ijro.uzdagi eng ko‘p xatoliklar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Edo.ijro.uzdagi eng ko‘p xatoliklar bo'limi hali to'ldirilmagan." : "Раздел наиболее частых ошибок на Edo.ijro.uz еще не заполнен."
    );
});


bot.hears("📋 Murojaatlar haqida", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Murojaatlar haqida bo'limi hali to'ldirilmagan." : "Раздел запросов еще не заполнен."
    );
});

bot.hears("📝 Shikoyat va takliflar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Shikoyat va takliflar bo'limi hali to'ldirilmagan." : "Раздел жалоб и предложений еще не заполнен."
    );
});


bot.hears("📞 Telefon raqamlar", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Telefon raqamlar bo'limi hali to'ldirilmagan." : "Раздел телефонных номеров еще не заполнен."
    );
});

bot.hears("🧑‍🤝‍🧑 Foydalanuvchi ro'yxati", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";

    await ctx.reply(
        lang === "UZB" ? "Foydalanuvchi ro'yxati bo'limi hali to'ldirilmagan." : "Раздел списка пользователей еще не заполнен."
    );
});


bot.hears("♻️ Tilni o'zgartirish", async (ctx) => {
    console.log('menuhears')
    await selectLang(ctx);
});


bot.hears("⬅️ Orqaga", async (ctx) => {
    const user = await User.findOne({ user_id: ctx.message.from.id });
    const lang = user?.user_lang || "UZB";
    
    await sendHomeMenu(ctx, lang);
});
