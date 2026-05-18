import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as Minio from 'minio';
import path, { join } from 'path';
import { Repository } from 'typeorm';
import { Files } from '../entities/file.entity';
export const ValidExtensions = {
  IMAGES: ['jpeg', 'png'],

  DOCUMENTS: ['pdf', 'zip', 'rar', 'x-zip-compressed'],
} as const;

export type ImageExtension = (typeof ValidExtensions.IMAGES)[number];
export type documentExtension = (typeof ValidExtensions.DOCUMENTS)[number];
export const AllVailidExntesions = [
  ...ValidExtensions.IMAGES,
  ...ValidExtensions.DOCUMENTS,
];

@Injectable()
export class StorageService {
  private minioClient!: Minio.Client;
  private bucket!: string;
  private provider!: string;
  private localPath!: string;
  private fs = require('fs').promises;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Files)
    private readonly fileRepository: Repository<Files>,
  ) {
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
    } catch (error) {
      await this.fs.mkdir(this.localPath, { recursive: true });
    }
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) throw new Error('File is empty');
    const fileExtension = file.mimetype.split('/')[1];

    if (!ValidExtensions.IMAGES.includes(fileExtension as any))
      throw new BadRequestException(`Wrong file extension`);
    const secureUrl = `${crypto.randomUUID()}-${file.originalname}`;

    var url;

    if (this.provider === 'minio') {
      url = 'http://localhost:9000/bucket-files/';

      await this.minioClient.putObject(
        this.bucket,
        secureUrl,
        file.buffer,
        file.size,
        { 'Content-Type': file.mimetype },
      );
      url = await this.minioClient.presignedGetObject(
        this.bucket,
        secureUrl,
        2 * 60 * 60,
      );
      // url = await this.minioClient.presignedGetObject(this.bucket, file.originalname,20000)
    } else {
      url = 'http://localhost:3000/api/files/projects/';
      const path = join(__dirname, '../../../static/projects', secureUrl);
      await this.fs.writeFile(path, file.buffer);
      url = url + secureUrl;
    }
    const newFile = this.fileRepository.create({
      originalName: file.originalname,
      key: secureUrl,
      mimeType: file.mimetype,
      size: file.size,
    });

    const saved = await this.fileRepository.save(newFile);

    return {
      id: saved.id,
      originalName: saved.originalName,
      key: saved.key,
      url: url,
    };
  }

  getProvider() {
    return this.provider;
  }

  async getFileUrl(key: string) {
    if (this.provider == 'minio') {
      return await this.minioClient.presignedGetObject(
        this.bucket,
        key,
        2 * 60 * 60,
      );
    }

    return `http://localhost:3000/api/files/project/${key}`;
  }

  async uploadMultipleFiles(files: Express.Multer.File[]) {
    if (!files || files.length < 0) {
      throw new BadRequestException(`There's no files`);
    }

    for (const file of files) {
      const fileExtension = file.mimetype.split('/')[1];
      if (!AllVailidExntesions.includes(fileExtension as any))
        throw new BadRequestException(`Not allowed file`);
    }
    const promises = files.map(async (file) => {
      const secureUrl = `${crypto.randomUUID()}-${file.originalname}`;

      var url;

      if (this.provider === 'minio') {
        url = 'http://localhost:9000/bucket-files/';

        await this.minioClient.putObject(
          this.bucket,
          secureUrl,
          file.buffer,
          file.size,
          { 'Content-Type': file.mimetype },
        );
        url = await this.minioClient.presignedGetObject(
          this.bucket,
          secureUrl,
          2 * 60 * 60,
        );
        // url = await this.minioClient.presignedGetObject(this.bucket, file.originalname,20000)
      } else {
        url = 'http://localhost:3000/api/files/project/';
        const path = join(__dirname, '../../../static/projects', secureUrl);
        await this.fs.writeFile(path, file.buffer);
        url = url + secureUrl;
      }

      const newFile = this.fileRepository.create({
        originalName: file.originalname,
        key: secureUrl,
        mimeType: file.mimetype,
        size: file.size,
      });

      const saved = await this.fileRepository.save(newFile);
      return {
        id: saved.id,
        originalName: saved.originalName,
        key: saved.key,
        url: url,
      };
    });
    return Promise.all(promises);
  }
}
