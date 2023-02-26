import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, ListDTO } from '../dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  public async create(createUserDto: CreateUserDTO): Promise<IUser> {
    throw new NotFoundException('Testing');
  }
  public async update(): Promise<any> {}
  public async findOne(): Promise<any> {}
  public async findAll(listDTO: ListDTO): Promise<IUser[]> {
    try {
      return [];
    } catch (e) {
      throw new HttpException(
        e.message || 'Error',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
