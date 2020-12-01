import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  address: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  serviceOfActivity: string;

  @IsNumber()
  nuberOfEmloyees: number;

  @IsString()
  @MinLength(5)
  @MaxLength(150)
  description: string;

  @IsString()
  @MinLength(5)
  @MaxLength(30)
  type: string;
}

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  address: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(50)
  serviceOfActivity: string;

  @IsNumber()
  @IsOptional()
  nuberOfEmloyees: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(150)
  description: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(30)
  type: string;
}
