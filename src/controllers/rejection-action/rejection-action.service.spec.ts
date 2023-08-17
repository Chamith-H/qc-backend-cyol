import { Test, TestingModule } from '@nestjs/testing';
import { RejectionActionService } from './rejection-action.service';

describe('RejectionActionService', () => {
  let service: RejectionActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectionActionService],
    }).compile();

    service = module.get<RejectionActionService>(RejectionActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
