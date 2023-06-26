import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from "src/schemas"
import { ERROR_CODES } from 'src/common';

interface Register {
  name: string;
  email: string;
  password: string;
  verificationToken: string
}

@Injectable()
export class UserRepository {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) { }

  async register(user: Register) {
    const newUser = await this.userModel.create({
      ...user
    });

    if (!user) {
      throw new BadRequestException(ERROR_CODES.ERROR_WHILE_CREATING_USER);
    }
    return newUser;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async findOne(query: object) {
    const user = await this.userModel.findOne(query)
    return user;
  }

  async findByIdAndUpdate(id: string, updateData: object) {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true });
    return user;
  }
}