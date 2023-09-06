import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from './multer.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
    PrismaModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
