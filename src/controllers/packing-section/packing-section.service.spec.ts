import { Test, TestingModule } from '@nestjs/testing';
import { PackingSectionService } from './packing-section.service';

describe('PackingSectionService', () => {
  let service: PackingSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackingSectionService],
    }).compile();

    service = module.get<PackingSectionService>(PackingSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
