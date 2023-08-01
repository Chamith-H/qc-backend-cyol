import { Test, TestingModule } from '@nestjs/testing';
import { QcParameterController } from './qc-parameter.controller';

describe('QcParameterController', () => {
  let controller: QcParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QcParameterController],
    }).compile();

    controller = module.get<QcParameterController>(QcParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
