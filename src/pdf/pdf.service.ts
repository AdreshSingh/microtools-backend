import { Injectable, BadRequestException } from '@nestjs/common';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as JSZip from 'jszip';
import * as sharp from 'sharp';
import * as pdf2pic from 'pdf2pic';

@Injectable()
export class PdfService {
  async mergePdfs(files: Express.Multer.File[]): Promise<Buffer> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    if (files.length < 2) {
      throw new BadRequestException('At least 2 PDF files are required for merging');
    }

    try {
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Process each uploaded PDF file
      for (const file of files) {
        // Validate file type
        if (!file.mimetype || file.mimetype !== 'application/pdf') {
          throw new BadRequestException(`File ${file.originalname} is not a valid PDF`);
        }

        // Load the PDF document
        const pdfBytes = file.buffer;
        const pdf = await PDFDocument.load(pdfBytes);

        // Copy all pages from the current PDF to the merged PDF
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save the merged PDF as bytes
      const mergedPdfBytes = await mergedPdf.save();
      return Buffer.from(mergedPdfBytes);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to merge PDF files: ' + error.message);
    }
  }

  async compressPdf(file: Express.Multer.File): Promise<Buffer> {
    this.validatePdfFile(file);

    try {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);

      // Compress by saving with compression options
      const compressedPdfBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 20,
        updateFieldAppearances: false,
      });

      return Buffer.from(compressedPdfBytes);
    } catch (error) {
      throw new BadRequestException('Failed to compress PDF: ' + error.message);
    }
  }

  async splitPdf(file: Express.Multer.File, range: string): Promise<Buffer> {
    this.validatePdfFile(file);

    try {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const pageCount = pdf.getPageCount();

      // Parse range (e.g., "2-5" or "1,3,5")
      const pages = this.parsePageRange(range, pageCount);

      if (pages.length === 0) {
        throw new BadRequestException('Invalid page range or no pages selected');
      }

      // Create new PDF with selected pages
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pages);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const splitPdfBytes = await newPdf.save();
      return Buffer.from(splitPdfBytes);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to split PDF: ' + error.message);
    }
  }

  async pdfToImages(file: Express.Multer.File): Promise<Buffer> {
    this.validatePdfFile(file);

    try {
      // For now, we'll return a simple message since pdf2pic has compatibility issues
      // In a production environment, you might want to use a different library like pdf-poppler
      throw new BadRequestException('PDF to images conversion is temporarily unavailable. Please use a different library like pdf-poppler for production.');

      // Alternative approach using a different library would be:
      // const pdfBytes = file.buffer;
      // const pdf = await PDFDocument.load(pdfBytes);
      // const pageCount = pdf.getPageCount();
      // 
      // // Convert each page to image (this would require a different library)
      // const zip = new JSZip();
      // 
      // for (let i = 0; i < pageCount; i++) {
      //   // Convert page to image buffer
      //   const imageBuffer = await convertPageToImage(pdf, i);
      //   zip.file(`page_${i + 1}.png`, imageBuffer);
      // }
      // 
      // const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
      // return zipBuffer;
    } catch (error) {
      throw new BadRequestException('Failed to convert PDF to images: ' + error.message);
    }
  }

  async addWatermark(file: Express.Multer.File, watermarkText: string): Promise<Buffer> {
    this.validatePdfFile(file);

    if (!watermarkText || watermarkText.trim() === '') {
      throw new BadRequestException('Watermark text is required');
    }

    try {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const pageCount = pdf.getPageCount();

      // Embed font
      const font = await pdf.embedFont(StandardFonts.Helvetica);

      // Add watermark to all pages
      for (let i = 0; i < pageCount; i++) {
        const page = pdf.getPage(i);
        const { width, height } = page.getSize();

        // Add watermark text
        page.drawText(watermarkText, {
          x: width / 2 - 50,
          y: height / 2,
          size: 24,
          font: font,
          color: rgb(0.8, 0.8, 0.8), // Light gray
          opacity: 0.3,
        });
      }

      const watermarkedPdfBytes = await pdf.save();
      return Buffer.from(watermarkedPdfBytes);
    } catch (error) {
      throw new BadRequestException('Failed to add watermark: ' + error.message);
    }
  }

  async reorderPages(file: Express.Multer.File, order: string): Promise<Buffer> {
    this.validatePdfFile(file);

    try {
      const pdfBytes = file.buffer;
      const pdf = await PDFDocument.load(pdfBytes);
      const pageCount = pdf.getPageCount();

      // Parse order string (e.g., "3,1,2")
      const pageOrder = this.parsePageOrder(order, pageCount);

      if (pageOrder.length === 0) {
        throw new BadRequestException('Invalid page order or no pages selected');
      }

      // Create new PDF with reordered pages
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pageOrder);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const reorderedPdfBytes = await newPdf.save();
      return Buffer.from(reorderedPdfBytes);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to reorder pages: ' + error.message);
    }
  }

  private validatePdfFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!file.mimetype || file.mimetype !== 'application/pdf') {
      throw new BadRequestException(`File ${file.originalname} is not a valid PDF`);
    }
  }

  private parsePageRange(range: string, totalPages: number): number[] {
    const pages: number[] = [];
    const parts = range.split(',');

    for (const part of parts) {
      if (part.includes('-')) {
        // Range format: "2-5"
        const [start, end] = part.split('-').map(Number);
        if (start && end && start <= end && start > 0 && end <= totalPages) {
          for (let i = start - 1; i < end; i++) {
            if (!pages.includes(i)) {
              pages.push(i);
            }
          }
        }
      } else {
        // Single page: "3"
        const pageNum = Number(part);
        if (pageNum && pageNum > 0 && pageNum <= totalPages) {
          const pageIndex = pageNum - 1;
          if (!pages.includes(pageIndex)) {
            pages.push(pageIndex);
          }
        }
      }
    }

    return pages.sort((a, b) => a - b);
  }

  private parsePageOrder(order: string, totalPages: number): number[] {
    const pageOrder: number[] = [];
    const parts = order.split(',');

    for (const part of parts) {
      const pageNum = Number(part.trim());
      if (pageNum && pageNum > 0 && pageNum <= totalPages) {
        const pageIndex = pageNum - 1;
        if (!pageOrder.includes(pageIndex)) {
          pageOrder.push(pageIndex);
        }
      }
    }

    return pageOrder;
  }
} 