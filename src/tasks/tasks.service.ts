import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { Request, Response } from 'express';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto, res: Response) {
    const { taskType, location, floor, area, startTime, assignToUser } = dto;

    const user = await this.prisma.user.findUnique({
      where: {
        username: assignToUser,
      },
    });
    if (!user) {
      res.status(404);
      return res.send({ message: 'User not found' });
    }
    try {
      const createdTask = await this.prisma.task.create({
        data: {
          taskType: taskType,
          location: location,
          floor: floor,
          area: area,
          startTime: startTime,
          assignToUser: { connect: { id: user.id } },
        },
      });

      res.status(200);
      return res.send({
        message: 'Created a task successfully',
        task: createdTask,
      });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500);
      return res.send({ message: 'Failed to create a task' });
    }
  }
  async getTasks(req: Request) {
    const user = req.user as { id: string; username: string };

    const tasks = await this.prisma.task.findMany({
      where: { userId: user.id },
    });

    return { tasks };
  }
}
