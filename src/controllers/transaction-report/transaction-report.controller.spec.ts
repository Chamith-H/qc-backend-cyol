import { Test, TestingModule } from '@nestjs/testing';
import { TransactionReportController } from './transaction-report.controller';

describe('TransactionReportController', () => {
  let controller: TransactionReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionReportController],
    }).compile();

    controller = module.get<TransactionReportController>(TransactionReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
