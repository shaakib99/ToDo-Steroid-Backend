import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CommonListDTO {
  @IsNumber()
  @IsOptional()
  skip: number;

  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  lastIndex: string;
}
