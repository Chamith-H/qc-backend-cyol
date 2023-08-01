import { Test, TestingModule } from '@nestjs/testing';
import { StandardDataService } from './standard-data.service';

describe('StandardDataService', () => {
  let service: StandardDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandardDataService],
    }).compile();

    service = module.get<StandardDataService>(StandardDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
