import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsIn(['citizen', 'officer', 'admin'])
  role!: string;
}