import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path, { join } from 'path';
import * as Minio from 'minio'
import { existsSync } from 'fs';
import { url } from 'inspector';

@Injectable()
export class StorageService {
  private minioClient!: Minio.Client;
  private bucket!: string;
  private provider!: string;
  private localPath!: string;
   private fs = require('fs').promises;

  constructor(private configService: ConfigService) {
    
    this.provider = this.configService.get('STORAGE_PROVIDER') as string;

    if (this.provider === 'minio') {
      this.minioClient = new Minio.Client({
        endPoint: this.configService.get('MINIO_ENDPOINT') as string,
        port: parseInt(this.configService.get('MINIO_PORT') as string, 10),
        useSSL: false,
        accessKey: this.configService.get('MINIO_ACCESS_KEY'),
        secretKey: this.configService.get('MINIO_SECRET_KEY'),
      });
      this.bucket = this.configService.get('MINIO_BUCKET') as string;
    } else {
      this.localPath = path.join(process.cwd(), 'files');
      this.ensureLocalDirectoryExists();
    }
   
  }

  async ensureLocalDirectoryExists() {
    try {
      await this.fs.access(this.localPath);
      console.log(this.localPath)
    } catch (error) {
      await this.fs.mkdir(this.localPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
   
    var url;
    console.log(file)
    if (this.provider === 'minio') {
        url = 'http://localhost:9000/bucket-files/';
       
      await this.minioClient.putObject(
        this.bucket,
        file.originalname,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype },
      );
      
     // url = await this.minioClient.presignedGetObject(this.bucket, file.originalname,20000)

    } else {
        url ='http://localhost:3000/api/files/project/'
         const path = join(__dirname, '../../../static/projects', file.filename);
       
            

      await this.fs.writeFile(path, file.buffer);
    }
    const finalUrl = url + file.originalname
    return finalUrl;
  }

  getProvider() {
    return this.provider;
  }
}
