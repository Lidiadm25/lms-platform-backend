import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import type { Response } from 'express';

import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('project/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);

    /*
      res.status(403).json({
        ok: false,
        path: path
      }) */
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
      throw new BadRequestException('No hay archivo ');
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
}
