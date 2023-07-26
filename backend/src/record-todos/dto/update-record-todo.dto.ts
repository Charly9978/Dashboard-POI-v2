import { PartialType } from '@nestjs/swagger';
import { CreateRecordTodoDto } from './create-record-todo.dto';

export class UpdateRecordTodoDto extends PartialType(CreateRecordTodoDto) {}
