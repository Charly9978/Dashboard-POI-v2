import { Module } from '@nestjs/common';
import { RecordTodosService } from './record-todos.service';
import { RecordTodosController } from './record-todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordTodo } from './entities/record-todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordTodo])],
  controllers: [RecordTodosController],
  providers: [RecordTodosService],
})
export class RecordTodosModule {}
