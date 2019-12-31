import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ShareDto } from '../dto/share.dto';

@Injectable()
export class ValidationSharePipe implements PipeTransform {
  async transform(
    value: ShareDto,
    { metatype }: ArgumentMetadata,
  ): Promise<ShareDto> {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length) {
      throw new BadRequestException('Url and user are required fields');
    }
    return value;
  }
}
