import { Test, TestingModule } from '@nestjs/testing';
import { RejectionItemService } from './rejection-item.service';

describe('RejectionItemService', () => {
  let service: RejectionItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectionItemService],
    }).compile();

    service = module.get<RejectionItemService>(RejectionItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
