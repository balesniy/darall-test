import {ClassConstructor, ClassTransformOptions, plainToInstance} from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ApplicationError, ValidationErrorField } from '../libs/rest/index.js';


export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

type PlainObject = Record<string, unknown>;

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function fillDto<T, V extends PlainObject>(
    DtoClass: new () => T,
    plainObject: V,
    options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends PlainObject[]>(
    DtoClass: new () => T,
    plainObject: V,
    options?: ClassTransformOptions,
): T[];

export function fillDto<T, V extends PlainObject>(
    DtoClass: new () => T,
    plainObject: V,
    options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}
