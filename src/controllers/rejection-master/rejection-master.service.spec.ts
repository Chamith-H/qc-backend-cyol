import { Test, TestingModule } from '@nestjs/testing';
import { RejectionMasterService } from './rejection-master.service';

describe('RejectionMasterService', () => {
  let service: RejectionMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectionMasterService],
    }).compile();

    service = module.get<RejectionMasterService>(RejectionMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
