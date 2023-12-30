import {
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsArray, IsOptional, IsString,
} from 'class-validator';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateUpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateUpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferMessage.price.min })
  @Max(200000, { message: CreateUpdateOfferMessage.price.max })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.categories.invalidFormat })
  @IsInt({ each: true, message: CreateUpdateOfferMessage.categories.invalidFormat })
  public categories?: number[];

  @IsOptional()
  @IsString({ message: CreateUpdateOfferMessage.image.invalidFormat })
  @MaxLength(256, { message: CreateUpdateOfferMessage.image.maxLength })
  public image?: string;
}
