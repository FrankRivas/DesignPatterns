import { Injectable, HttpException, ConflictException, BadRequestException } from '@nestjs/common';
import { Users } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../repositories/userRepository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async singup(user: RegisterDto): Promise<Users> {
    let invalidUsername: Users | undefined;
    let invalidEmail: Users | undefined;
    try {
      invalidUsername = await this.userRepository.getUserByParam('username', user.username);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (invalidUsername) {
      throw new ConflictException();
    }
    try {
      invalidEmail = await this.userRepository.getUserByParam('email', user.email);
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

  async changePassword(userId: number, pass: string): Promise<Users> {
    let user: Users | undefined;
    try {
      user = await this.userRepository.getUserByParam('id', userId);
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
