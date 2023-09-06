import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { FilesService } from 'src/uploads/files.service';

@Module({
  providers: [TasksService, FilesService],
  controllers: [TasksController],
})
export class TasksModule {}
