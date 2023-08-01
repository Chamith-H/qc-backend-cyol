import { Test, TestingModule } from '@nestjs/testing';
import { BasedocService } from './basedoc.service';

describe('BasedocService', () => {
  let service: BasedocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasedocService],
    }).compile();

    service = module.get<BasedocService>(BasedocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
