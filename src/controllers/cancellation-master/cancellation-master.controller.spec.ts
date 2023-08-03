import { Test, TestingModule } from '@nestjs/testing';
import { CancellationMasterController } from './cancellation-master.controller';

describe('CancellationMasterController', () => {
  let controller: CancellationMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancellationMasterController],
    }).compile();

    controller = module.get<CancellationMasterController>(CancellationMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
