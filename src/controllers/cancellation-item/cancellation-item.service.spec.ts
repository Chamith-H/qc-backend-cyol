import { Test, TestingModule } from '@nestjs/testing';
import { CancellationItemService } from './cancellation-item.service';

describe('CancellationItemService', () => {
  let service: CancellationItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancellationItemService],
    }).compile();

    service = module.get<CancellationItemService>(CancellationItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
