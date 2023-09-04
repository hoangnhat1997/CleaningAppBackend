import { Floor, TaskType, User } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  public taskType: TaskType;

  @IsString()
  public location: string;

  @IsString()
  public floor: Floor;

  @IsString()
  public area: string;

  @IsString()
  public startTime: string;

  @IsString()
  public assignToUser: string;
}
