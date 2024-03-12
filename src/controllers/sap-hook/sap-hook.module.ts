import { Module } from '@nestjs/common';
import { SapHookController } from './sap-hook.controller';
import { SapHookService } from './sap-hook.service';
import { SapIntegrationModule } from '../sap-integration/sap-integration.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SapGrn, SapGrnSchema } from 'src/schemas/sap-hooks/sap-grn.schema';
import { SapIvr, SapIvrSchema } from 'src/schemas/sap-hooks/sap-ivr.schema';
import { InspectionModule } from '../inspection/inspection.module';
import {
  SapReturn,
  SapReturnSchema,
} from 'src/schemas/sap-hooks/sap-return.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SapGrn.name, schema: SapGrnSchema }]),
    MongooseModule.forFeature([{ name: SapIvr.name, schema: SapIvrSchema }]),
    MongooseModule.forFeature([
      { name: SapReturn.name, schema: SapReturnSchema },
    ]),
    SapIntegrationModule,
    InspectionModule,
  ],
  controllers: [SapHookController],
  providers: [SapHookService],
})
export class SapHookModule {}
