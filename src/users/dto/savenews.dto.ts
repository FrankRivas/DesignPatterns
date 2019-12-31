import { IsNotEmpty, IsUrl } from 'class-validator';

export class SaveNewsDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
