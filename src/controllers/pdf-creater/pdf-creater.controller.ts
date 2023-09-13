import { Controller, Post, Body } from '@nestjs/common';
import { PdfCreaterService } from './pdf-creater.service';
import { CreateTokenPDFDto } from './pdf-creater.dto';

@Controller('pdf-creater')
export class PdfCreaterController {
  constructor(private readonly pdfCreaterService: PdfCreaterService) {}

  @Post('token')
  async createTokenPDF(@Body() dto: CreateTokenPDFDto) {
    const response = await this.pdfCreaterService.create_tokenPDF(dto);
    const baseString = response.toString('base64');

    return {
      pdf: 'Created',
      message: 'success',
      body: baseString,
    };
  }
}
