import { Injectable } from '@nestjs/common';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from 'src/helpers/password.helper';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const { email, password, role } = dto;

    const userExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userExist) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await hashPassword(password);
    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
        role,
      },
    });
    return { message: 'Signup was sucessful' };
  }

  async signin(dto: AuthDto, req: Request, res: Response) {
    const { email, password } = dto;
    const userExist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!userExist) {
      throw new BadRequestException('Wrong credentials');
    }
    const isMatch = await comparePassword({
      password,
      hash: userExist.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Wrong Credentials');
    }
    const token = await this.signToken({
      id: userExist.id,
      email: userExist.email,
    });
    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie('token', token);
    return res.send({ token, message: 'Logged in sucessful' });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'user logged out sucessfully' });
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;

    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
