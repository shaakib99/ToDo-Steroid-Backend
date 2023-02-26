import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  public async create(): Promise<any> {}
  public async update(): Promise<any> {}
  public async findOne(): Promise<any> {}
  public async findAll(): Promise<any> {}
}
