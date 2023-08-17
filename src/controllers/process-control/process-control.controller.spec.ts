import { Test, TestingModule } from '@nestjs/testing';
import { ProcessControlController } from './process-control.controller';

describe('ProcessControlController', () => {
  let controller: ProcessControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessControlController],
    }).compile();

    controller = module.get<ProcessControlController>(ProcessControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
