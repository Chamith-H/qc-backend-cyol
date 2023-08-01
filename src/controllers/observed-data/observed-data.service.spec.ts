import { Test, TestingModule } from '@nestjs/testing';
import { ObservedDataService } from './observed-data.service';

describe('ObservedDataService', () => {
  let service: ObservedDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservedDataService],
    }).compile();

    service = module.get<ObservedDataService>(ObservedDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
