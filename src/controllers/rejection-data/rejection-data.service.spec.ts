import { Test, TestingModule } from '@nestjs/testing';
import { RejectionDataService } from './rejection-data.service';

describe('RejectionDataService', () => {
  let service: RejectionDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectionDataService],
    }).compile();

    service = module.get<RejectionDataService>(RejectionDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
