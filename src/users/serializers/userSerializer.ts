import { Exclude } from 'class-transformer';
import { NewToUser } from '../entities/usernews.entity';

export class UserEntitySerializer {
  id: number;
  username: string;
  email: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  @Exclude()
  newsToUser: NewToUser[];
  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntitySerializer>) {
    Object.assign(this, partial);
  }
}
