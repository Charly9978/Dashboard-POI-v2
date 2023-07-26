import { IsEnum, IsInt, IsOptional, Length, Min } from 'class-validator';
import { Recipient } from '../entities/record-todo.entity';

export class CreateRecordTodoDto {
  @IsInt()
  @Min(0)
  /**
   * In minutes
   */
  delay: number;

  @Length(5, 255)
  description: string;

  @Length(5, 255)
  excercice_description: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  /**
   * In minutes
   */
  repeatTime?: number;

  @IsEnum(Recipient)
  recipient: Recipient;
}
