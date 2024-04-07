import { Module } from '@nestjs/common';
import {  UsersService } from './user.service';
import { UsersController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from '../bot/models/bot.model';
import { JwtModule } from '@nestjs/jwt';
import { User } from './models/user.models';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Bot]),
    JwtModule.register({}),
    BotModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
