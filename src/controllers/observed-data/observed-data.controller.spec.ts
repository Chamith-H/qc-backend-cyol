import { Test, TestingModule } from '@nestjs/testing';
import { ObservedDataController } from './observed-data.controller';

describe('ObservedDataController', () => {
  let controller: ObservedDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservedDataController],
    }).compile();

    controller = module.get<ObservedDataController>(ObservedDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
