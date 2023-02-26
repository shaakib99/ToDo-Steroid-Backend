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

  public async create(createUserDTO: CreateUserDTO): Promise<any> {}
  public async update(): Promise<any> {}
  public async findOne(): Promise<any> {}
  public async findAll(listDTO: ListDTO): Promise<IUser[]> {
    try {
      const query: any = {
        isActive: true,
        isDeleted: false,
        skip: listDTO.skip || 0,
        limit: listDTO.limit || 10,
      };

      if (listDTO.hasOwnProperty('lastIndex') && listDTO.lastIndex) {
        delete query.skip;
        delete query.limit;
        query.lastIndex = listDTO.lastIndex;
      }

      return this.userModel.find(query);
    } catch (e) {
      throw new HttpException(
        e.message || 'Error',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
