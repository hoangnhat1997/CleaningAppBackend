import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const { email, password, username } = dto;

    const userExists = await this.prisma.user.findUnique({
      where: { username },
    });

    if (userExists) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        hashedPassword: hashedPassword,
        role: UserRole.Cleaner,
      },
    });

    return { message: 'User created succefully' };
  }

  async signin(dto: AuthDto, req: Request, res: Response) {
    const { username, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const compareSuccess = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!compareSuccess) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      userId: foundUser.id,
      username: foundUser.username,
    });

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }

    // res.cookie('token', token, {});
    res.status(200);
    return res.send({ message: 'Logged in succefully', token: token });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Logged out succefully' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userId: string; username: string }) {
    const payload = {
      id: args.userId,
      username: args.username,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
    });

    return token;
  }
}
