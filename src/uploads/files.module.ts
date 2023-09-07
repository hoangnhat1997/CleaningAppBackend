import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { fileFilter } from './multer.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: fileFilter,
      }),
    }),
    PrismaModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
