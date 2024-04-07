import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './models/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.contants';
import { Context, Markup, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
  ) {}
  async start(ctx: Context) {
    const userId = ctx.from.id; 
    const user = await this.botRepo.findOne({ where: { user_id: userId } });
    if (!user) {
      await this.botRepo.create({
        user_id: userId,
        username: ctx.from.username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
      });
      await ctx.reply(
        `Iltimos,<b>"Telefon raqamni yuborish</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            Markup.button.contactRequest('Telefon raqamni yuborish'),
          ])
            .oneTime()
            .resize(),
        },
      );
    } else if (!user.status) {
      await ctx.reply(
        `Iltimos,<b>"Telefon raqamni yuborish</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            [Markup.button.contactRequest('Telefon raqamni yuborish')],
          ])
            .oneTime()
            .resize(),
        },
      );
    } else {
      await this.bot.telegram.sendChatAction(user.user_id, 'typing');
      await ctx.reply(
        `Bu bot orqali sz uchun avtomoyka xizmatlarini ko'rsatamiz`,
        {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        },
      );
    }
  }
  async onContact(ctx: Context) {
    if ('contact' in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botRepo.findOne({ where: { user_id: userId } });
      if (!user) {
        await ctx.reply(`Iltimos,<b>"/start</b> tugmasini bosing`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        });
      } else if (ctx.message.contact.user_id != userId) {
        await ctx.reply(`Iltimos,o'zingizni raqamingizni kiriting`, {
          parse_mode: 'HTML',
          ...Markup.keyboard([
            Markup.button.contactRequest('Telefon raqamni yuborish'),
          ])
            .oneTime()
            .resize(),
        });
      } else {
        await this.botRepo.update(
          {
            phone_number: ctx.message.contact.phone_number,
            status: true,
          },
          {
            where: { user_id: userId },
          },
        );

        await ctx.reply(`Tabriklayman,ro'yxatdan o'tdingiz!`, {
          parse_mode: 'HTML',
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botRepo.findOne({ where: { user_id: userId } });
    if (!user) {
      await ctx.reply(
        `Siz avval ro'yxatdan o'tmagansz,<b>"/start</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        },
      );
    } else if (user.status) {
      await this.botRepo.update(
        {
          status: false,
          phone_number: null,
        },
        { where: { user_id: userId } },
      );
      await ctx.reply(
        `Siz botdan chiqdingiz.Botdan qayta foydalanish uchun,<b>"/start</b> tugmasini bosing`,
        {
          parse_mode: 'HTML',
          ...Markup.keyboard([['/start']])
            .oneTime()
            .resize(),
        },
      );
    }
  }
  
}
