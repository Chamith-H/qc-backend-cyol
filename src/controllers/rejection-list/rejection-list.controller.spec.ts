import { Test, TestingModule } from '@nestjs/testing';
import { RejectionListController } from './rejection-list.controller';

describe('RejectionListController', () => {
  let controller: RejectionListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectionListController],
    }).compile();

    controller = module.get<RejectionListController>(RejectionListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
