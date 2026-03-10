import { Module } from '@nestjs/common';

import { UserProject } from './entities/user-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  providers: [],
  imports:[
    TypeOrmModule.forFeature([ UserProject ]),
  ]
})
export class UsersProjectsModule {}
