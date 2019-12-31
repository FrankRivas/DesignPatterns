import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class ShareDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsNumber()
  user: number;

  constructor(url: string, user: number) {
    this.url = url;
    this.user = user;
  }
}
