import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class NoEmptyValuesPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const errors = await validate(object);
    if (errors.length > 0) {
      return this.removeEmptyProperties(value);
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private removeEmptyProperties(value: any) {
    if (value && typeof value === 'object') {
      for (const key in value) {
        if (value.hasOwnProperty(key) && (value[key] === null || value[key] === undefined || value[key] === '')) {
          delete value[key];
        } else if (typeof value[key] === 'object') {
          this.removeEmptyProperties(value[key]);
        }
      }
    }
    return value;
  }
}