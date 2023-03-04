import {
  IsString,
  IsNumber,
  IsArray,
  IsBoolean,
  IsMongoId,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class UserDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsString()
  profilePic: string;

  @IsString()
  passwordResetToken: string;

  @IsNumber()
  passwordResetTokenGeneratedAt: number;

  @IsArray()
  devices: string[];

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  isDeleted: boolean;

  @IsBoolean()
  isAdmin: boolean;

  @IsNumber()
  cAt: number;

  @IsNumber()
  uAt: number;

  @IsMongoId()
  uBy: UserDTO;
}
