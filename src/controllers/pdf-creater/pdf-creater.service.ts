import { Injectable } from '@nestjs/common';
import { CreateTokenPDFDto } from './pdf-creater.dto';
import * as fs from 'fs';
const PDFDocument = require('pdfkit');

@Injectable()
export class PdfCreaterService {
  async create_tokenPDF(dto: CreateTokenPDFDto): Promise<Buffer> {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('output.pdf'));

    doc.fillColor('red').text(`Token Number : ${dto.data.tokenId}`);
    doc.fillColor('grey').text(`PO Number : ${dto.data.poNumber}`);
    doc.text(`Supplier Name : ${dto.data.supplier}`);
    doc.text(`Vehicle Number : ${dto.data.vehicle}`);
    doc.text(`Driver Name : ${dto.data.driver}`);
    doc.text(`Created Date : ${dto.data.date}`);

    doc.text(' ');
    doc.fillColor('black').text('Token Items');

    dto.data.docItems.forEach((item) => {
      doc.fillColor('grey').text(`Item Code : ${item.itemCode}`);
      doc.text(`PO Line Number : ${item.line}`);
    });

    doc.end();

    return new Promise<Buffer>((resolve, reject) => {
      const buffers: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err: Error) => reject(err));
    });
  }
}
