import { Test, TestingModule } from '@nestjs/testing';
import { ActionDeleteService } from './action-delete.service';

describe('ActionDeleteService', () => {
  let service: ActionDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionDeleteService],
    }).compile();

    service = module.get<ActionDeleteService>(ActionDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
