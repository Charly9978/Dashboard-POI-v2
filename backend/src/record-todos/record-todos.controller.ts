import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseEnumPipe,
} from '@nestjs/common';
import { RecordTodosService } from './record-todos.service';
import { CreateRecordTodoDto } from './dto/create-record-todo.dto';
import { UpdateRecordTodoDto } from './dto/update-record-todo.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Recipient } from './entities/record-todo.entity';

@ApiTags('RecordTodo')
@Controller('record-todos')
export class RecordTodosController {
  constructor(private readonly recordTodosService: RecordTodosService) {}

  @Post()
  create(@Body() createRecordTodoDto: CreateRecordTodoDto) {
    return this.recordTodosService.create(createRecordTodoDto);
  }

  @Get()
  @ApiQuery({ name: 'recipient', enum: Recipient })
  findAll(
    @Query('recipient', new ParseEnumPipe(Recipient)) recipient: Recipient,
  ) {
    return this.recordTodosService.findAll(recipient);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordTodosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecordTodoDto: UpdateRecordTodoDto,
  ) {
    return this.recordTodosService.update(+id, updateRecordTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordTodosService.remove(+id);
  }
}
