import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../static/projects', imageName);

    if (!existsSync(path)) {
      throw new BadRequestException(`No product found with image ${imageName}`);
    }

    return path;
  }

  async deleteFile(fileName: string) {
    console.log(fileName);
    const path = join(__dirname, '../../static/projects', fileName);
    console.log(path);
    const fs = require('fs').promises;
    await fs.unlink(path);
  }
}
