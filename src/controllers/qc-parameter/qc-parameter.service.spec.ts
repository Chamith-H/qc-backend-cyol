import { Test, TestingModule } from '@nestjs/testing';
import { QcParameterService } from './qc-parameter.service';

describe('QcParameterService', () => {
  let service: QcParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QcParameterService],
    }).compile();

    service = module.get<QcParameterService>(QcParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
