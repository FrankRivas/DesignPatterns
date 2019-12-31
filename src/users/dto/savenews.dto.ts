import { IsString, IsNotEmpty } from 'class-validator';

export class SaveNewsDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
