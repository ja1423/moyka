import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { Bot } from './models/bot.model';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  controllers: [BotService],
  providers: [BotService],
})
export class BotModule {}
