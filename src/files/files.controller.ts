import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';
import { memoryStorage } from 'multer';
import { FilesService } from './files.service';
import { StorageService } from './storage/storage.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly storageService: StorageService,
  ) { }

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

  @Get('download/:id')
  async downloadFile(@Param('id') id: string) {
    const downloadUrl = await this.storageService.downloadFile(id)
    return { url: downloadUrl };


  }

}
