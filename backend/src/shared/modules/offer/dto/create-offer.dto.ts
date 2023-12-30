import {IsArray, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(200000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.categories.invalidFormat })
  @IsInt({ each: true, message: CreateOfferValidationMessage.categories.invalidId })
  public categories: number[];

  @IsOptional()
  @IsString({ message: CreateOfferValidationMessage.image.invalidFormat })
  @MaxLength(256, { message: CreateOfferValidationMessage.image.maxLength })
  public image?: string;
}
