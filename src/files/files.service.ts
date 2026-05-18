import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../static/projects', imageName);

    if (!existsSync(path)) {
      throw new BadRequestException(`No file found with name: ${imageName}`);
    }

    return path;
  }

  // async deleteFile(fileName: string) {
  //   const path = join(__dirname, '../../static/projects', fileName);
  //   const fs = require('fs').promises;
  //   await fs.unlink(path);
  // }
}
