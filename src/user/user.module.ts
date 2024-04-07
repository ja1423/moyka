import { Module } from '@nestjs/common';
import {  UsersService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from '../bot/models/bot.model';
import { JwtModule } from '@nestjs/jwt';
import { User } from './models/user.models';

@Module({
  imports: [SequelizeModule.forFeature([User,Bot]), JwtModule.register({})],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
