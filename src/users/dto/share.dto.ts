import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class ShareDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsNumber()
  user: number;

  constructor(url: string, user: number) {
    this.url = url;
    this.user = user;
  }
}
