import { Test, TestingModule } from '@nestjs/testing';
import { ProdCommonService } from './prod-common.service';

describe('ProdCommonService', () => {
  let service: ProdCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdCommonService],
    }).compile();

    service = module.get<ProdCommonService>(ProdCommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
