import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { PasswordDto } from '../dto/password.dto';

@Injectable()
export class ValidationPasswordPipe implements PipeTransform {
  async transform(
    value: PasswordDto,
    { metatype }: ArgumentMetadata,
  ): Promise<PasswordDto> {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length) {
      throw new BadRequestException('Password is a required field');
    }
    return value;
  }
}
