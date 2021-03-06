import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { NewToUser } from './usernews.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true, nullable: false })
  @Unique('Duplicate username', ['username'])
  username: string;

  @Exclude()
  @Column({ length: 256, nullable: false })
  password: string;

  @Column({ length: 50, unique: true, nullable: false })
  @Unique('Duplicate email', ['email'])
  email: string;

  @Column({ default: new Date() })
  lastLogin: Date;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    type => NewToUser,
    newToUser => newToUser.user,
  )
  public newsToUser: NewToUser[];
}
