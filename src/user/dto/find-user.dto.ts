import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  full_name ?: string;

  @IsPhoneNumber('UZ')
  phone ?: string;

  @IsEmail()
  email ?: string;

  @IsString()
  tg_link ?: string;

}
