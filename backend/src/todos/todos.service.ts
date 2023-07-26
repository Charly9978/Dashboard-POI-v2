import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  findAll(incidentId: number) {
    return this.todoRepository.find({
      where: {
        incident: {
          id: incidentId,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoToUpdate = await this.todoRepository.findOneByOrFail({ id });
    Object.assign(todoToUpdate, updateTodoDto);
    return this.todoRepository.save(todoToUpdate);
  }

  remove(id: number) {
    return this.todoRepository.delete({ id });
  }
}
