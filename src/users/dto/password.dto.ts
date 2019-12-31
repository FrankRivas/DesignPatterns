import { IsString, IsNotEmpty } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
