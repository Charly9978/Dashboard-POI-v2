import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsUrl,
  Length,
} from 'class-validator';
import { Roles } from '../entities/user.entity';

export class CreateUserDto {
  @IsOptional()
  @Length(3, 30)
  name?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  picture?: string;

  @IsOptional()
  @IsBoolean()
  admin?: boolean = false;

  @IsEnum(Roles)
  logRole?: Roles = Roles.READER;

  @IsEnum(Roles)
  dashBoardRole?: Roles = Roles.READER;
}
