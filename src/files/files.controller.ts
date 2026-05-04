import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';
import { MaxUploadSizeGuard } from './max-upload-size/max-upload-size.guard';
import { StorageService } from './storage/storage.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
    private readonly storageService: StorageService,
  ) {}

  @Get('project/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);

    res.status(403).json({
      ok: false,
      path: path,
    });
  }

  @Post('project')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/projects',
        filename: fileNamer,
      }),
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No hay archivo ');
    }
    const secureUrl = `${this.configService.get('HOST_API')}/files/project/${file.filename}`;
    console.log({ secureUrl });
    return { secureUrl };
  }

  // NO SÉ CÓMO HACERLO!

  @Post('lesson')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/projects',
        filename: fileNamer,
      }),
      limits: { fileSize: 2e9 },
    }),
  )
  uploadProjectFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('maxSize') size: number,
  ) {
    if (!file) {
      throw new BadRequestException(`No file was sent`);
    }
    const secureUrl = `${this.configService.get('HOST_API')}/files/project/${file.filename}`;

    if (file.size > +size) {
      this.filesService.deleteFile(file.filename);
      throw new BadRequestException(
        `File is over max size: ${file.size} > ${size} `,
      );
    }

    return { secureUrl };
  }

  @Post('bulk/:idTask')
  @UseGuards(MaxUploadSizeGuard)
  @UseInterceptors(
    FilesInterceptor('documents', 10, {
      // INTERCEPTOR PARA MULTIPLES ARCHIVOS
      // fileFilter: fileFilter,
      storage: memoryStorage(),

      limits: { fileSize: 2e9 },
    }),
  )
  async uploadFiles(
    @Param('idTask') idTask: String,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    const currentProvider = this.storageService.getProvider();

    const newFiles = await Promise.all(
   
      file.map(async (files) => {
        const safeName = await this.storageService.uploadFile(files);

        return safeName
      }),

    );

    return newFiles;
  }
}
