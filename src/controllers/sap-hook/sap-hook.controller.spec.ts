import { Test, TestingModule } from '@nestjs/testing';
import { SapHookController } from './sap-hook.controller';

describe('SapHookController', () => {
  let controller: SapHookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SapHookController],
    }).compile();

    controller = module.get<SapHookController>(SapHookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
