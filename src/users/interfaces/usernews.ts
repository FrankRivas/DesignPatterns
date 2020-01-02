import { Exclude, Expose } from 'class-transformer';

export interface UserNewsInterface {
  sharedBy: number;
  url: string;
  savedAt: Date;
}

export interface UserSharedNewsInterface {
  shared: Date;
  to: string;
  url: string;
}

export class Prueba {
  @Exclude()
  newToUserId!: number;
  @Exclude()
  sharedBy!: number;

  createdAt!: Date;

  @Exclude()
  user!: {
    id: number;
    username: string;
    password: string;
    email: string;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  };

  @Exclude()
  news!: {
    id: number;
    url: string;
    createdAt: Date;
    isActive: boolean;
  };
}
