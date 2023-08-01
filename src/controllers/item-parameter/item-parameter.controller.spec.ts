import { Test, TestingModule } from '@nestjs/testing';
import { ItemParameterController } from './item-parameter.controller';

describe('ItemParameterController', () => {
  let controller: ItemParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemParameterController],
    }).compile();

    controller = module.get<ItemParameterController>(ItemParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
