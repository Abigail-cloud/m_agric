import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/tools/jwt.guard';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUSer(@Param() param: { id: string }, @Req() req: Request) {
    return this.usersService.getUser(param.id, req);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
