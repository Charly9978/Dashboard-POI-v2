import { Test, TestingModule } from '@nestjs/testing';
import { RecordTodosController } from './record-todos.controller';
import { RecordTodosService } from './record-todos.service';

describe('RecordTodosController', () => {
  let controller: RecordTodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordTodosController],
      providers: [RecordTodosService],
    }).compile();

    controller = module.get<RecordTodosController>(RecordTodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
