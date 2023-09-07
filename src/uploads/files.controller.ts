import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Param,
  Get,
  Body,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
// import { storage } from './multer.config';
// import { CreateFileDto } from './dto/createFile.dto';
import { log } from 'console';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Get(':id')
  async getFileById(@Param() params: { id: string }, @Response() res) {
    console.log('-----id----', params.id);

    return this.fileService.getFileById(params.id, res);
  }
}
