import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class ShareDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  user: number;

  constructor(url: string, user: number) {
    this.url = url;
    this.user = user;
  }
}
