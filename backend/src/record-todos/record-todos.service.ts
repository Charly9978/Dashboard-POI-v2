import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordTodoDto } from './dto/create-record-todo.dto';
import { UpdateRecordTodoDto } from './dto/update-record-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipient, RecordTodo } from './entities/record-todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordTodosService {
  constructor(
    @InjectRepository(RecordTodo)
    private recorTodoRepository: Repository<RecordTodo>,
  ) {}

  create(createRecordTodoDto: CreateRecordTodoDto) {
    const recordTodo = this.recorTodoRepository.create(createRecordTodoDto);
    return this.recorTodoRepository.save(recordTodo);
  }

  findAll(recipient: Recipient) {
    return this.recorTodoRepository.find({
      where: {
        recipient: recipient,
      },
    });
  }

  findOne(id: number) {
    return this.recorTodoRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateRecordTodoDto: UpdateRecordTodoDto) {
    try {
      // eslint-disable-next-line prettier/prettier
      const recordTodoToUpdate = await this.recorTodoRepository.findOneByOrFail({ id });
      Object.assign(recordTodoToUpdate, updateRecordTodoDto);
      return this.recorTodoRepository.save(recordTodoToUpdate);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  remove(id: number) {
    return this.recorTodoRepository.delete({ id });
  }
}
