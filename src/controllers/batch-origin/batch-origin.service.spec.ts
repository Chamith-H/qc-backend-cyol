import { Test, TestingModule } from '@nestjs/testing';
import { BatchOriginService } from './batch-origin.service';

describe('BatchOriginService', () => {
  let service: BatchOriginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BatchOriginService],
    }).compile();

    service = module.get<BatchOriginService>(BatchOriginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
