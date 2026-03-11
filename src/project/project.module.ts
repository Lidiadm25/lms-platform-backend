import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { SectionsModule } from 'src/sections/sections.module';
import { SectionsService } from 'src/sections/sections.service';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports:[
    TypeOrmModule.forFeature([ Project ]),
    AuthModule,
  ],
  exports: [ TypeOrmModule, ProjectService]
})
export class ProjectModule {}
