import { Test, TestingModule } from '@nestjs/testing';
import { RejectionMasterController } from './rejection-master.controller';

describe('RejectionMasterController', () => {
  let controller: RejectionMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectionMasterController],
    }).compile();

    controller = module.get<RejectionMasterController>(RejectionMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
