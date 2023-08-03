import { Test, TestingModule } from '@nestjs/testing';
import { SapIntegrationController } from './sap-integration.controller';

describe('SapIntegrationController', () => {
  let controller: SapIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SapIntegrationController],
    }).compile();

    controller = module.get<SapIntegrationController>(SapIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
