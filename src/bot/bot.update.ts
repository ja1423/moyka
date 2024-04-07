import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class UpdateBot {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    await this.botService.onContact(ctx);
  }

  @Command('stop')
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  // @On('photo')
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ('photo' in ctx.message) {
  //     console.log(ctx.message.photo);
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
  //     );
  //   }
  // }

  // @On('video')
  // async onVideo(@Ctx() ctx: Context) {
  //   if ('video' in ctx.message) {
  //     console.log(ctx.message.video);
  //     await ctx.reply(String(ctx.message.video.file_name));
  //   }
  // }
  // @On('sticker')
  // async onStiker(@Ctx() ctx: Context) {
  //   if ('sticker' in ctx.message) {
  //     console.log(ctx.message.sticker);
  //     await ctx.reply('');
  //   }
  // }
  // @On('animation')
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ('animation' in ctx.message) {
  //     console.log(ctx.message.animation);
  //     await ctx.reply('Animate');
  //   }
  // }
  @On('location')
  async onLocation(@Ctx() ctx: Context) {
    if ('location' in ctx.message) {
      console.log(ctx.message.location);
      await ctx.reply(String(ctx.message.location.latitude));
      await ctx.reply(String(ctx.message.location.longitude));
    }
  }
  //

  // @On('')
  // async onVoice(@Ctx() ctx: Context) {
  //   if ('voice' in ctx.message) {
  //     console.log(ctx.message.voice);
  //     await ctx.reply(String(ctx.message.voice.duration));
  //   }
  // }

  // @Hears('hi')
  // async hearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply('hey there');
  // }

  // @Command('help')
  // async helpCommand(@Ctx() ctx: Context) {
  //   await ctx.reply('ertaga aytaman');
  // }

  // @On('invoice')
  // async onInvoice(@Ctx() ctx: Context) {
  //   if ('invoice' in ctx.message) {
  //     console.log(ctx.message.invoice);
  //     await ctx.reply(String(ctx.message.invoice.title));
  //   }
  // }

  // @Command('inline_keyboard')
  // async inlineButton(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: 'button 1',
  //         callback_data: 'button1',
  //       },
  //       {
  //         text: 'button 2',
  //         callback_data: 'button2',
  //       },
  //       {
  //         text: 'button 3',
  //         callback_data: 'button3',
  //       },
  //     ],
  //     [
  //       {
  //         text: 'button 4',
  //         callback_data: 'button4',
  //       },
  //     ],
  //     [
  //       {
  //         text: 'button 5',
  //         callback_data: 'button5',
  //       },
  //     ],
  //   ];
  //   await ctx.reply('Inline buttonni tanla', {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  @Action('Mashina xizmatlari')
  async onActionButton1(@Ctx() ctx: Context) {
    await ctx.reply('button 1 bosildi');
  }

//   @Action('avtomobil')
//   async onActionButton2(@Ctx() ctx: Context) {
//     await ctx.reply('');
//   }

//   @Action(/button+[1-9]/)
//   async onActionAnyButton(@Ctx() ctx: Context) {
//     await ctx.reply('Any button bosildi');
//   }

  @Command("main_keyboard")
  async onMainButton(@Ctx() ctx: Context) {
    await ctx.reply('Main button tanla:',{
      parse_mode:'HTML',
      ...Markup.keyboard([
        ['avtomobil'],
        ["Yuk mashinasi"],
        [
          Markup.button.contactRequest('Telefon raqamni yuboring')
        ],
        [
          Markup.button.locationRequest('Lakatsiya yuboring va ozingizga yaqin servisni tanlang')
        ],
      ]).resize()
    });
  }

  // @Hears('bir')
  // async hearBir()

  // @On('text')
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx);

  //   if ('text' in ctx.message) {
  //     if (ctx.message.text == 'salom') {
  //       await ctx.replyWithHTML('<b>Hello</b>');
  //     } else {
  //       await ctx.replyWithHTML(ctx.message.text);
  //     }
  //   }
  // }

  // @On('message')
  // async onMessage(@Ctx() ctx: Context) {
  //   console.log(ctx.botInfo);
  //   console.log(ctx.chat.id);
  //   console.log(ctx.from);
  // }
}
