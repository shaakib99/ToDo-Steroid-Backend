import { Injectable } from '@nestjs/common';
import { IUser } from '../../user/interfaces/';
import { UserService } from '../../user/services';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async verifyToken(token: string): Promise<IUser> {
    return this.userService.findOne();
  }
}
