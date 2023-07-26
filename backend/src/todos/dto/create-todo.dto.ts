import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TypeOfTodo } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  close_at?: Date;

  @Type(() => Date)
  @IsDate()
  objectifDate: Date;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  comments?: string;

  @IsOptional()
  @IsEnum(TypeOfTodo)
  typeOfTodo?: TypeOfTodo;

  @IsOptional()
  @IsString()
  exerciceDescription?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  incidentId: number;
}
