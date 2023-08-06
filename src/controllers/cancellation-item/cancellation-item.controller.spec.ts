import { Test, TestingModule } from '@nestjs/testing';
import { CancellationItemController } from './cancellation-item.controller';

describe('CancellationItemController', () => {
  let controller: CancellationItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancellationItemController],
    }).compile();

    controller = module.get<CancellationItemController>(CancellationItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
