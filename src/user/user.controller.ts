import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user.models';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
// import { CookieGetter } from '../decorators/cookie_getter.decorator';
// import { UserGuard } from '../guards/user.guard';
import { FindUserDto } from './dto/find-user.dto';
// import { PhoneUserDto } from './dto/phone-user.dto';
// import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 201, type: User })
  @Post('signUp')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  // @UseGuards(UserGuard)
  // @HttpCode(200)
  // @Post('logout')
  // logout(
  //   @CookieGetter ('refresh_token') refreshToken: string,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   return this.usersService.logout(refreshToken, res);
  // }

  // @HttpCode(200)
  // @Post(':id/refresh')
  // refresh(
  //   @Param('id') id: number,
  //   @CookieGetter('refresh_token') refreshToken: string,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   return this.usersService.refreshToken(+id, refreshToken, res);
  // }
  @HttpCode(200)
  @Post('find')
  findUser(@Body() findUserDto: FindUserDto) {
    return this.usersService.findUser(findUserDto);
  }
  // @HttpCode(200)
  // @Post('newOtp')
  // newOtp(@Body() phoneUserDto: PhoneUserDto) {
  //   return this.usersService.newOtp(phoneUserDto);
  // }
  // @HttpCode(200)
  // @Post('verifyOtp')
  // verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
  //   return this.usersService.verifyOtp(verifyOtpDto);
  // }

  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
// function CookieGetter(arg0: string): (target: UsersController, propertyKey: "refresh", parameterIndex: 1) => void {
//   throw new Error('Function not implemented.');
// }

