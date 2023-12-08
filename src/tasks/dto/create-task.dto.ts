import {
  ArrayMinSize,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;

  @ArrayMinSize(0)
  categories: string[];
}
