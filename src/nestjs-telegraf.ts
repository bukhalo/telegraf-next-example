import "dotenv/config";
import { Module } from "@nestjs/common";
import { Command, TelegrafModule, Update, Ctx, On } from "nestjs-telegraf";
import { NestFactory } from "@nestjs/core";

@Update()
class OnMessageUpdate {
  @On("message")
  message(@Ctx() ctx: any) {
    const msg = "On message handled.";
    ctx.reply(msg);
    console.log(msg);
  }
}

@Module({
  providers: [OnMessageUpdate],
})
class ExtModule {}

@Update()
class CommandUpdate {
  @Command("test")
  test(@Ctx() ctx: any) {
    const msg = "Test command handled";
    ctx.reply(msg);
    console.log(msg);
  }
}

@Module({
  providers: [CommandUpdate],
})
class ExtModule2 {}

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TOKEN as string,
    }),
    ExtModule,
    ExtModule2,
  ],
})
class AppModule {}

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.init();
};

bootstrap();
