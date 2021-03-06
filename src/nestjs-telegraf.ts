import "dotenv/config";
import { Module } from "@nestjs/common";
import { Command, TelegrafModule, Update, Ctx, On } from "nestjs-telegraf";
import { NestFactory } from "@nestjs/core";

@Update()
class Updates {
  @Command("test")
  test(@Ctx() ctx: any) {
    const msg = "Test command handled";
    ctx.reply(msg);
    console.log(msg);
  }

  @On("message")
  message(@Ctx() ctx: any) {
    const msg = "On message handled.";
    ctx.reply(msg);
    console.log(msg);
  }
}

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TOKEN as string,
    }),
  ],
  providers: [Updates],
})
class AppModule {}

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.init();
};

bootstrap();
