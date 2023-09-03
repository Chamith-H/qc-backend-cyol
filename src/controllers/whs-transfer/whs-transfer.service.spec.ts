import { Test, TestingModule } from '@nestjs/testing';
import { WhsTransferService } from './whs-transfer.service';

describe('WhsTransferService', () => {
  let service: WhsTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhsTransferService],
    }).compile();

    service = module.get<WhsTransferService>(WhsTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
