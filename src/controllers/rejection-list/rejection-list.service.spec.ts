import { Test, TestingModule } from '@nestjs/testing';
import { RejectionListService } from './rejection-list.service';

describe('RejectionListService', () => {
  let service: RejectionListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectionListService],
    }).compile();

    service = module.get<RejectionListService>(RejectionListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
