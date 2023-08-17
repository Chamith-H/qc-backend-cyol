import { Test, TestingModule } from '@nestjs/testing';
import { DocOriginController } from './doc-origin.controller';

describe('DocOriginController', () => {
  let controller: DocOriginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocOriginController],
    }).compile();

    controller = module.get<DocOriginController>(DocOriginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
