import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import type { Response } from 'express';

import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FilesService } from './files.service';
import { StorageService } from './storage/storage.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly storageService: StorageService,
  ) {}

  @Get('project/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    if (this.storageService.getProvider() == 'minio')
      throw new BadRequestException();

    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);

    res.status(403).json({
      ok: false,
      path: path,
    });
  }

  @Get('url/:id')
  async getUrl(@Param('id') id: string) {
    const url = await this.storageService.getFileUrl(id);

    return { url };
  }

  // @Post('bulk/:idTask')
  // @UseInterceptors(
  //   FilesInterceptor('documents', 10, {
  //     // INTERCEPTOR PARA MULTIPLES ARCHIVOS
  //     // fileFilter: fileFilter,
  //     storage: memoryStorage(),

  //     limits: { fileSize: 2e9 },
  //   }),
  // )
  // async uploadFiles(
  //   @Param('idTask') idTask: String,
  //   @UploadedFiles() file: Array<Express.Multer.File>,
  // ) {
  //   const currentProvider = this.storageService.getProvider();

  //   const newFiles = await Promise.all(
  //     file.map(async (files) => {
  //       // const safeName = await this.storageService.uploadFile(files);
  //       //  return safeName
  //     }),
  //   );

  //   return newFiles;
  // }
}
