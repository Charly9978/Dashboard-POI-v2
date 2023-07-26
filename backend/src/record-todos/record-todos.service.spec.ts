import { Test, TestingModule } from '@nestjs/testing';
import { RecordTodosService } from './record-todos.service';

describe('RecordTodosService', () => {
  let service: RecordTodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordTodosService],
    }).compile();

    service = module.get<RecordTodosService>(RecordTodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
