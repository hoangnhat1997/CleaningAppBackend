import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    const decodedUserInfo = req.user as { id: string; username: string };

    if (foundUser.id !== decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    delete foundUser.hashedPassword;

    return { user: foundUser };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, username: true },
    });

    return { users };
  }
}
