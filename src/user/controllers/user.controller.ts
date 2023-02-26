import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findAll(): Promise<string> {
    return this.userService.findAll();
  }
}
