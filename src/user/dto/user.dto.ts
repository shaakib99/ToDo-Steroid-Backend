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
import { Exclude } from 'class-transformer';

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
  @Exclude({})
  password: string;

  @IsString()
  profilePic: string;

  @IsString()
  @Exclude({})
  passwordResetToken: string;

  @IsNumber()
  @Exclude({})
  passwordResetTokenGeneratedAt: number;

  @IsArray()
  @Exclude({})
  devices: string[];

  @IsBoolean()
  isActive: boolean;

  @IsBoolean()
  @Exclude({})
  isDeleted: boolean;

  @IsBoolean()
  @Exclude({})
  isAdmin: boolean;

  @IsNumber()
  @Exclude({})
  cAt: number;

  @IsNumber()
  @Exclude({})
  uAt: number;

  @IsMongoId()
  @Exclude({})
  uBy: UserDTO;
}
