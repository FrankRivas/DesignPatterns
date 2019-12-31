import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class ValidationRegisterPipe implements PipeTransform {
  async transform(
    value: RegisterDto,
    { metatype }: ArgumentMetadata,
  ): Promise<RegisterDto> {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length) {
      throw new BadRequestException(
        'Username, password and email are required fields',
      );
    }
    return value;
  }
}
