import { Test, TestingModule } from '@nestjs/testing';
import { PackingSectionController } from './packing-section.controller';

describe('PackingSectionController', () => {
  let controller: PackingSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackingSectionController],
    }).compile();

    controller = module.get<PackingSectionController>(PackingSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
