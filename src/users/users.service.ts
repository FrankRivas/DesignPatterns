import {
  Injectable,
  HttpException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async getUserByParam(
    param: string,
    value: string | number,
  ): Promise<Users | undefined> {
    let user: Users | undefined;
    try {
      user = await this.userRepository.findOne({
        where: [{ [param]: value }],
      });
    } catch (error) {
      throw new HttpException('', error);
    }
    return user;
  }

  async singup(user: RegisterDto): Promise<Users | undefined> {
    let invalidUsername: Users | undefined;
    let invalidEmail: Users | undefined;
    try {
      invalidUsername = await this.getUserByParam('username', user.username);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (invalidUsername) {
      throw new ConflictException();
    }
    try {
      invalidEmail = await this.getUserByParam('email', user.email);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (invalidEmail) {
      throw new ConflictException();
    }
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (error) {
      throw new HttpException('', error);
    }
    try {
      return this.userRepository.save(user);
    } catch (err) {
      throw new HttpException('', err);
    }
  }

  async changePassword(
    userId: number,
    pass: string,
  ): Promise<Users | undefined> {
    const user = await this.getUserByParam('id', userId);
    if (user) {
      try {
        user.password = await bcrypt.hash(pass, 10);
        return this.userRepository.save(user);
      } catch (error) {
        throw new HttpException('', error);
      }
    } else {
      throw new BadRequestException();
    }
  }
}
