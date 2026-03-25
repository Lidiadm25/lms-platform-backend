import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res} from '@nestjs/common';
import type { Response } from 'express';

import { FilesService } from './files.service';
import { diskStorage, Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService,
    private readonly configService : ConfigService
  ) {}


  @Get('project/:imageName')
    findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName:string){

      const path = this.filesService.getStaticProductImage( imageName );

      res.sendFile ( path );

      /*
      res.status(403).json({
        ok: false,
        path: path
      }) */
    }
  


  @Post('project')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/projects',
      filename: fileNamer
    })
}))

  uploadProductImage(
    @UploadedFile() file: Express.Multer.File){
      
      if(!file){
        throw new BadRequestException('No hay archivo ')
      }
      const secureUrl = `${this.configService.get('HOST_API')}/files/project/${file.filename}`;

    return {secureUrl};
  }
}
