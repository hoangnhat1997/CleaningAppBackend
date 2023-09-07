import { Injectable, NotFoundException, Response } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';

import { CreateTaskDto } from 'src/tasks/dto/createTask.dto';
// import { CreateFileDto } from './dto/createFile.dto';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}
  async createFile(imageBuffer, filename) {
    return this.prisma.databaseFile.create({
      data: {
        filename: filename,
        data: imageBuffer,
      },
    });
  }
  async getFileById(id: string, res) {
    const file = await this.prisma.databaseFile.findUnique({ where: { id } });

    const stream = Readable.from(file.data);

    stream.pipe(res);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    console.log('-----File-------', file);

    // const filepath = res.sendFile(file, { root: './uploads/tasks' });
  }
}
