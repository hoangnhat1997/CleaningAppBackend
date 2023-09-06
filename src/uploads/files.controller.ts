import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Param,
  Get,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { storage } from './multer.config';
import { CreateFileDto } from './dto/createFile.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async UploadedFile(@UploadedFile() file: CreateFileDto) {
    return this.fileService.createFile(file);
  }

  @Get('id')
  async getFileById(@Param('id') id: string) {
    return this.fileService.getFileById(id);
  }
}
