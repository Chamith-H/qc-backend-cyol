import { Test, TestingModule } from '@nestjs/testing';
import { ActionDeleteController } from './action-delete.controller';

describe('ActionDeleteController', () => {
  let controller: ActionDeleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionDeleteController],
    }).compile();

    controller = module.get<ActionDeleteController>(ActionDeleteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
