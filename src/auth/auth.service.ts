import { Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async validateUser(username: string, pass: string): Promise<{}> {
    let userFromDB: Users | undefined;
    try {
      userFromDB = await this.userRepository.findOne({
        where: [{ username }],
      });
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!userFromDB) {
      // If user does not exist
      throw new UnauthorizedException('Wrong Credentials');
    }
    let passwordMatch = false;
    try {
      passwordMatch = await bcrypt.compare(pass, userFromDB.password);
    } catch (error) {
      throw new HttpException('', error);
    }
    if (!passwordMatch) {
      // If invalid password
      throw new UnauthorizedException('Wrong Credentials');
    }
    const { password, ...result } = userFromDB;
    return result;
  }

  login(user: UserDto): {} {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
