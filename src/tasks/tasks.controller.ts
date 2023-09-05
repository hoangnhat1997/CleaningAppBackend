import {
  Body,
  Controller,
  Post,
  UseGuards,
  Response,
  Get,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Body() dto: CreateTaskDto, @Response() res) {
    return this.taskService.createTask(dto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Request() req) {
    return this.taskService.getTasks(req);
  }
}
