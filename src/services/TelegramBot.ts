import { Bot, InlineKeyboard } from "grammy";
import dotenv from "dotenv";
import FreeGame from "@/types/FreeGame";
import {esc, truncate} from "@/lib/utils";
dotenv.config();

const CAPTION_LIMIT = 1024;

class TelegramBot {

    bot: Bot;

    constructor(token: string) {
        this.bot = new Bot(token);
    }

    async sendMessage(chatId: string, text: string) {
        await this.bot.api.sendMessage(chatId, text);
    }

    async sendImage(chatId: string, url: string, caption?: string, keyboard?: InlineKeyboard) {
        await this.bot.api.sendPhoto(chatId, url, {
            caption: caption ?? "",
            parse_mode: "HTML",
            reply_markup: keyboard ?? undefined,
        });
    }

    async announceFreeGame(game: FreeGame) {

        const header = `🎮 ${game.title}\n`;
        const footer = `\nFree until ${game.end.toUTCString()}`;

        const budget = CAPTION_LIMIT - 10 - header.length - footer.length;

        const caption =
            `🎮 <b>${esc(game.title)}</b>\n` +
            `${esc(truncate(game.description ?? "", budget))}` +
            footer;

        const keyboard = new InlineKeyboard().url("Check in store", game.url);

        if (game.image){
            await this.sendImage(process.env.TELEGRAM_CHANNEL_ID!, game.image, caption, keyboard);
        }else{
            await this.sendMessage(process.env.TELEGRAM_CHANNEL_ID!, caption);
        }
    }

}

export default new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);