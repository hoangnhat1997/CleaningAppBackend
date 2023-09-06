import {
  Body,
  Controller,
  Post,
  UseGuards,
  Response,
  Get,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../uploads/multer.config';
import { CreateFileDto } from 'src/uploads/dto/createFile.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  async createTask(
    @Body() dto: CreateTaskDto,
    @Response() res,
    @UploadedFile() file: CreateFileDto,
  ) {
    return this.taskService.createTask(dto, res, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Request() req) {
    return this.taskService.getTasks(req);
  }
}
