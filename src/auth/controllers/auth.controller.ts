import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from '../../user/interfaces';
import { LoginDTO } from '../dto';
import { TokenInterceptor } from '../../common/interceptors';
import { AuthService } from '../services';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(TokenInterceptor)
  @Post('/login')
  async login(@Body() loginDTO: LoginDTO): Promise<IUser> {
    try {
      return this.authService.login(loginDTO);
    } catch (err) {
      throw new HttpException(
        err?.message || 'Error',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
