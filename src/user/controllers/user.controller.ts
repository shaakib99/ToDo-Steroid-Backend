import { Controller, Get, Query } from '@nestjs/common';
import { ListDTO } from '../dto';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Query() listDTO: ListDTO): Promise<IUser[]> {
    return this.userService.findAll(listDTO);
  }
}
