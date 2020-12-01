import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber,
  Length,
} from 'class-validator';

export class SinginDto {
  @IsEmail()
  @IsString()
  @MinLength(6)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class SignupDto extends SinginDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @MinLength(6)
  nickName: string;

  @IsString()
  @Length(8, 11)
  phoneNumb: string;

  @IsString()
  @MinLength(5)
  description: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  position: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @IsOptional()
  @Length(8, 11)
  phoneNumb: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  desription: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  position: string;
}

export interface OwnerPayload {
  nickName: string;
}
