import { Test, TestingModule } from '@nestjs/testing';
import { ProcessControlService } from './process-control.service';

describe('ProcessControlService', () => {
  let service: ProcessControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessControlService],
    }).compile();

    service = module.get<ProcessControlService>(ProcessControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
