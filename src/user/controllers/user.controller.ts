import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators';
import { AuthGuard } from '../../common/guards';
import { CreateUserDTO, ListDTO } from '../dto';
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
