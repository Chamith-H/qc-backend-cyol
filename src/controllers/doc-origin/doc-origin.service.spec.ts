import { Test, TestingModule } from '@nestjs/testing';
import { DocOriginService } from './doc-origin.service';

describe('DocOriginService', () => {
  let service: DocOriginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocOriginService],
    }).compile();

    service = module.get<DocOriginService>(DocOriginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
