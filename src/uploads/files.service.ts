import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/createFile.dto';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}
  async createFile(file: CreateFileDto) {
    const { filename, mimetype, size } = file;

    return this.prisma.file.create({
      data: {
        filename: filename,
        mimetype: mimetype,
        size: size,
      },
    });
  }
  async getFileById(id: string) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }
}
