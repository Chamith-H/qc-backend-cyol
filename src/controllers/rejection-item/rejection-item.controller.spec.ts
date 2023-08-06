import { Test, TestingModule } from '@nestjs/testing';
import { RejectionItemController } from './rejection-item.controller';

describe('RejectionItemController', () => {
  let controller: RejectionItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectionItemController],
    }).compile();

    controller = module.get<RejectionItemController>(RejectionItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
