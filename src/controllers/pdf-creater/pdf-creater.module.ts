import { Module } from '@nestjs/common';
import { PdfCreaterController } from './pdf-creater.controller';
import { PdfCreaterService } from './pdf-creater.service';

@Module({
  controllers: [PdfCreaterController],
  providers: [PdfCreaterService]
})
export class PdfCreaterModule {}
