import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SaveNewsDto } from '../dto/savenews.dto';

@Injectable()
export class ValidationSaveNewsPipe implements PipeTransform {
  async transform(
    value: SaveNewsDto,
    { metatype }: ArgumentMetadata,
  ): Promise<SaveNewsDto> {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length) {
      throw new BadRequestException('Url is a required field');
    }
    return value;
  }
}
