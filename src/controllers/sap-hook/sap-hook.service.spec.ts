import { Test, TestingModule } from '@nestjs/testing';
import { SapHookService } from './sap-hook.service';

describe('SapHookService', () => {
  let service: SapHookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SapHookService],
    }).compile();

    service = module.get<SapHookService>(SapHookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
