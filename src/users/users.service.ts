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
import { UserRepository } from './repository/userRepository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly userQueryRepository: UserRepository,
  ) {}

  async singup(user: RegisterDto): Promise<Users | undefined> {
    let invalidUsername: Users | undefined;
    let invalidEmail: Users | undefined;
    try {
      invalidUsername = await this.userQueryRepository.getUserByParam(
        'username',
        user.username,
      );
    } catch (error) {
      throw new HttpException('', error);
    }
    if (invalidUsername) {
      throw new ConflictException();
    }
    try {
      invalidEmail = await this.userQueryRepository.getUserByParam(
        'email',
        user.email,
      );
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
    let user: Users | undefined;
    try {
      user = await this.userQueryRepository.getUserByParam('id', userId);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!user) {
      throw new BadRequestException();
    }
    try {
      user.password = await bcrypt.hash(pass, 10);
      return this.userRepository.save(user);
    } catch (error) {
      throw new HttpException('', error);
    }
  }
}
