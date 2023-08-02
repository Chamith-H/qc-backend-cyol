import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// ---> Custom module imports
import { AuthModule } from './controllers/auth/auth.module';
import { RoleModule } from './controllers/role/role.module';
import { PermissionModule } from './controllers/permission/permission.module';
import { UomModule } from './controllers/uom/uom.module';
import { EquipmentModule } from './controllers/equipment/equipment.module';
import { QcParameterModule } from './controllers/qc-parameter/qc-parameter.module';
import { ItemParameterModule } from './controllers/item-parameter/item-parameter.module';
import { InspectionModule } from './controllers/inspection/inspection.module';
import { TokenModule } from './controllers/token/token.module';
import { StageModule } from './controllers/stage/stage.module';
import { StandardDataModule } from './controllers/standard-data/standard-data.module';
import { ObservedDataModule } from './controllers/observed-data/observed-data.module';
import { BatchOriginModule } from './controllers/batch-origin/batch-origin.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://canacademy:cana9875sh@canacademy.a2xbmdz.mongodb.net/cyolqcapp",
    ),
    AuthModule,
    RoleModule,
    PermissionModule,
    UomModule,
    EquipmentModule,
    QcParameterModule,
    ItemParameterModule,
    InspectionModule,
    TokenModule,
    StageModule,
    StandardDataModule,
    ObservedDataModule,
    BatchOriginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
