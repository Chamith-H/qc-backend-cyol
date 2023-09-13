import { Test, TestingModule } from '@nestjs/testing';
import { PdfCreaterService } from './pdf-creater.service';

describe('PdfCreaterService', () => {
  let service: PdfCreaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfCreaterService],
    }).compile();

    service = module.get<PdfCreaterService>(PdfCreaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
