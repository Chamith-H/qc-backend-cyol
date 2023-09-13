import { Test, TestingModule } from '@nestjs/testing';
import { PdfCreaterController } from './pdf-creater.controller';

describe('PdfCreaterController', () => {
  let controller: PdfCreaterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfCreaterController],
    }).compile();

    controller = module.get<PdfCreaterController>(PdfCreaterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
