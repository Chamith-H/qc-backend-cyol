import { Test, TestingModule } from '@nestjs/testing';
import { WhsTransferController } from './whs-transfer.controller';

describe('WhsTransferController', () => {
  let controller: WhsTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhsTransferController],
    }).compile();

    controller = module.get<WhsTransferController>(WhsTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
