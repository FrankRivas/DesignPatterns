import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../dto/users.dto';

@Injectable()
export class ValidationUserPipe implements PipeTransform {
  async transform(
    value: UserDto,
    { metatype }: ArgumentMetadata,
  ): Promise<UserDto> {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length) {
      throw new BadRequestException(
        'Username and Password are required fields',
      );
    }
    return value;
  }
}
