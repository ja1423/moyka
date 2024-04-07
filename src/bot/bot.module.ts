import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { Bot } from './models/bot.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UpdateBot } from './bot.update';
import { UsersController } from '../user/user.controller';
import { UsersService } from '../user/user.service';


@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  controllers: [BotService,UpdateBot],
  providers: [BotService],
})
export class BotModule {}
