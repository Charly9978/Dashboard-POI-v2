import { IsNotEmpty, IsPhoneNumber, Length, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsNotEmpty()
  @Length(3, 25)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MaxLength(5)
  @ApiProperty()
  level: string;

  @IsNotEmpty()
  @MaxLength(5)
  @ApiProperty()
  building: string;

  @IsPhoneNumber('FR')
  @ApiProperty()
  phone_number: string;
}
