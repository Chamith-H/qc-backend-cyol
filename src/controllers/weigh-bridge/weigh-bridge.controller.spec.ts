import { Test, TestingModule } from '@nestjs/testing';
import { WeighBridgeController } from './weigh-bridge.controller';

describe('WeighBridgeController', () => {
  let controller: WeighBridgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeighBridgeController],
    }).compile();

    controller = module.get<WeighBridgeController>(WeighBridgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
