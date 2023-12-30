import { Expose } from 'class-transformer';

export class CategoryRdo {
  @Expose({ name: 'categoryId' })
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public offerCount: number;

  @Expose()
  public image: string;
}
