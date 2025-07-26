import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) { }

  @Post('merge')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      fileFilter: (req, file, callback) => {
        // Validate file type
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException(`File ${file.originalname} is not a PDF`),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit per file
        files: 10, // Maximum 10 files
      },
    }),
  )
  async mergePdfs(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      const mergedPdfBuffer = await this.pdfService.mergePdfs(files);

      // Set response headers for file download
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged.pdf"',
        'Content-Length': mergedPdfBuffer.length.toString(),
      });

      // Send the merged PDF
      res.send(mergedPdfBuffer);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to merge PDF files');
    }
  }

  @Post('compress')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException(`File ${file.originalname} is not a PDF`),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async compressPdf(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const compressedPdfBuffer = await this.pdfService.compressPdf(file);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="compressed.pdf"',
        'Content-Length': compressedPdfBuffer.length.toString(),
      });

      res.send(compressedPdfBuffer);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to compress PDF');
    }
  }

  @Post('split')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException(`File ${file.originalname} is not a PDF`),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async splitPdf(
    @UploadedFile() file: Express.Multer.File,
    @Body('range') range: string,
    @Res() res: Response,
  ) {
    try {
      if (!range || range.trim() === '') {
        throw new BadRequestException('Page range is required (e.g., "2-5" or "1,3,5")');
      }

      const splitPdfBuffer = await this.pdfService.splitPdf(file, range);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="split.pdf"',
        'Content-Length': splitPdfBuffer.length.toString(),
      });

      res.send(splitPdfBuffer);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to split PDF');
    }
  }

  @Post('to-images')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException(`File ${file.originalname} is not a PDF`),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async pdfToImages(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const zipBuffer = await this.pdfService.pdfToImages(file);

      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="pdf_images.zip"',
        'Content-Length': zipBuffer.length.toString(),
      });

      res.send(zipBuffer);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to convert PDF to images');
    }
  }

  @Post('watermark')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException(`File ${file.originalname} is not a PDF`),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async addWatermark(
    @UploadedFile() file: Express.Multer.File,
    @Body('text') watermarkText: string,
    @Res() res: Response,
  ) {
    try {
      if (!watermarkText || watermarkText.trim() === '') {
        throw new BadRequestException('Watermark text is required');
      }

      const watermarkedPdfBuffer = await this.pdfService.addWatermark(file, watermarkText);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="watermarked.pdf"',
        'Content-Length': watermarkedPdfBuffer.length.toString(),
      });

      res.send(watermarkedPdfBuffer);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to add watermark');
    }
  }

  @Post('reorder')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException(`File ${file.originalname} is not a PDF`),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async reorderPages(
    @UploadedFile() file: Express.Multer.File,
    @Body('order') order: string,
    @Res() res: Response,
  ) {
    try {
      if (!order || order.trim() === '') {
        throw new BadRequestException('Page order is required (e.g., "3,1,2")');
      }

      const reorderedPdfBuffer = await this.pdfService.reorderPages(file, order);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="reordered.pdf"',
        'Content-Length': reorderedPdfBuffer.length.toString(),
      });

      res.send(reorderedPdfBuffer);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to reorder pages');
    }
  }
} 