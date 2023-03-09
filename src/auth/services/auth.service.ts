import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '../../user/interfaces/';
import { LoginDTO } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async login(loginDto: LoginDTO): Promise<IUser> {
    try {
      const user = await this.userModel
        .findOne({ email: loginDto.email })
        .select(['_id,', 'email', 'password', 'isActive', 'isDeleted']);

      if (!user || user.isDeleted) {
        throw new NotFoundException('Email does not exist');
      }

      const passwordHash = await bcrypt.hash(
        loginDto.password,
        Number(process.env.SALT_ROUND || 10),
      );
      const isPasswordMatch = bcrypt.compareSync(
        loginDto?.password,
        passwordHash,
      );

      if (!isPasswordMatch) {
        throw new NotAcceptableException('Password Does not match');
      }

      await user.updateOne({ isActive: true });
      return user;
    } catch (err) {
      throw new HttpException(
        err?.message || 'Something went wrong',
        err?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
