import { Test, TestingModule } from '@nestjs/testing';
import { SapIntegrationService } from './sap-integration.service';

describe('SapIntegrationService', () => {
  let service: SapIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SapIntegrationService],
    }).compile();

    service = module.get<SapIntegrationService>(SapIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
