import { Test, TestingModule } from '@nestjs/testing';
import { CancellationMasterService } from './cancellation-master.service';

describe('CancellationMasterService', () => {
  let service: CancellationMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancellationMasterService],
    }).compile();

    service = module.get<CancellationMasterService>(CancellationMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
