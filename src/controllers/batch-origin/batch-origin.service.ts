import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BatchOrigin,
  BatchOriginDocument,
} from 'src/schemas/origin/batch-origin.schema';

@Injectable()
export class BatchOriginService {
  constructor(
    @InjectModel(BatchOrigin.name)
    private readonly batchModel: Model<BatchOriginDocument>,
  ) {}

  async create_newBatch() {
    const currentBatch = await this.batchModel
      .find({})
      .sort({ currentNo: -1 })
      .limit(1)
      .exec();

    if (currentBatch.length > 0) {
      return currentBatch[0].currentNo + 1;
    } else {
      return 0 + 1;
    }
  }

  async save_newBatch() {
    const newBatchNumber = await this.create_newBatch();

    const batchOriginDoc = { currentNo: newBatchNumber };
    const newBatch = new this.batchModel(batchOriginDoc);
    const saveBatch = await newBatch.save();
    console.log();

    return 'BT-' + saveBatch.currentNo.toString();
  }
}
