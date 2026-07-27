import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}



  async create(
    createUserDto: CreateUserDto,
  ): Promise<User> {

    // Check existing email
    const existingUser =
      await this.userModel.findOne({
        email: createUserDto.email,
      });


    if (existingUser) {
      throw new BadRequestException(
        'Email already exists',
      );
    }


    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        createUserDto.password,
        10,
      );


    // Create user
    const newUser =
      new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });


    return newUser.save();
  }



  async findAll(): Promise<User[]> {

    return this.userModel
      .find()
      .exec();

  }



  async findByEmail(
    email: string,
  ): Promise<User | null> {

    return this.userModel
      .findOne({ email })
      .exec();

  }

}