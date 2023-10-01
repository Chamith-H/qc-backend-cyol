import { Test, TestingModule } from '@nestjs/testing';
import { ProdCommonController } from './prod-common.controller';

describe('ProdCommonController', () => {
  let controller: ProdCommonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdCommonController],
    }).compile();

    controller = module.get<ProdCommonController>(ProdCommonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
