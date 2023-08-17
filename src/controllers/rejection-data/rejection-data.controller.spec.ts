import { Test, TestingModule } from '@nestjs/testing';
import { RejectionDataController } from './rejection-data.controller';

describe('RejectionDataController', () => {
  let controller: RejectionDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectionDataController],
    }).compile();

    controller = module.get<RejectionDataController>(RejectionDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
