import { Test, TestingModule } from '@nestjs/testing';
import { WeightRecordController } from './weight-record.controller';

describe('WeightRecordController', () => {
  let controller: WeightRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightRecordController],
    }).compile();

    controller = module.get<WeightRecordController>(WeightRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
