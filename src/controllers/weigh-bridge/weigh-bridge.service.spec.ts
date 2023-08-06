import { Test, TestingModule } from '@nestjs/testing';
import { WeighBridgeService } from './weigh-bridge.service';

describe('WeighBridgeService', () => {
  let service: WeighBridgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeighBridgeService],
    }).compile();

    service = module.get<WeighBridgeService>(WeighBridgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
