import "dotenv/config";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TOKEN as string);

bot.command("/test", (ctx) => {
  const msg = "Test command handled";
  ctx.reply(msg);
  console.log(msg);
});

bot.on("message", (ctx) => {
  const msg = "On message handled.";
  ctx.reply(msg);
  console.log(msg);
});

bot.launch();
