import { Role } from '@prisma/client';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be between 3 and 20 chars' })
  public password!: string;
  @IsNotEmpty()
  public role!: Role;
}
