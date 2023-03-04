import {
  HttpException,
  NotAcceptableException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, ListDTO, UserDTO } from '../dto';
import { IUser } from '../interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  public async create(createUserDTO: CreateUserDTO): Promise<IUser> {
    try {
      const isExistingUser = await this.userModel.findOne({
        email: createUserDTO?.email,
      });

      if (isExistingUser) {
        throw new NotAcceptableException('User already exist');
      }

      let userDTO = new UserDTO();
      userDTO.name = createUserDTO?.name;
      userDTO.email = createUserDTO?.email;
      userDTO.password = await bcrypt.hash(
        createUserDTO.password,
        process.env.PASSWORD_ENCRYPTION_HASH,
      );
      const user = await this.userModel.create(userDTO);
      return user.save();
    } catch (err) {
      throw new HttpException(
        err.message || 'Error',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  public async update(): Promise<any> {}
  public async findOne(): Promise<any> {}
  public async findAll(listDTO: ListDTO): Promise<IUser[]> {
    try {
      const query: any = {
        isActive: true,
        isDeleted: false,
        skip: listDTO?.skip || 0,
        limit: listDTO?.limit || 10,
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
