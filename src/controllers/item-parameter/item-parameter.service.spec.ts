import { Test, TestingModule } from '@nestjs/testing';
import { ItemParameterService } from './item-parameter.service';

describe('ItemParameterService', () => {
  let service: ItemParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemParameterService],
    }).compile();

    service = module.get<ItemParameterService>(ItemParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
