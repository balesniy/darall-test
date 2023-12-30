import { IsString, Length } from 'class-validator';
import { CreateCategoryMessages } from './create-category.messages.js';

export class CreateCategoryDto {
  @IsString({ message: CreateCategoryMessages.name.invalidFormat })
  @Length(4, 12, { message: CreateCategoryMessages.name.lengthField })
  public name: string;
  @IsString({ message: CreateCategoryMessages.name.invalidFormat })
  @Length(4, 120, { message: CreateCategoryMessages.name.lengthField })
  public description: string;
}

export class UpdateCategoryDto {
  @IsString({ message: CreateCategoryMessages.name.invalidFormat })
  @Length(4, 12, { message: CreateCategoryMessages.name.lengthField })
  public name: string;
  @IsString({ message: CreateCategoryMessages.name.invalidFormat })
  @Length(4, 120, { message: CreateCategoryMessages.name.lengthField })
  public description: string;
}
