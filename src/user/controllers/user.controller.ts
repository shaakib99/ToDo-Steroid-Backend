import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDTO, ListDTO, UserDTO } from '../dto';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<IUser> {
    try {
      return this.userService.create(createUserDTO);
    } catch (err) {
      throw new HttpException(
        err?.message || 'Error',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get()
  findAll(@Query() listDTO: ListDTO): Promise<IUser[]> {
    try {
      return this.userService.findAll(listDTO);
    } catch (err) {
      throw new HttpException(
        err?.message || 'Error',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
