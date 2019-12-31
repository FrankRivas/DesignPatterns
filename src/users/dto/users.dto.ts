import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(username: string, password: string, id: number) {
    this.username = username;
    this.password = password;
    this.id = id;
  }
}
