import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { NewToUser } from 'src/users/entities/usernews.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true, nullable: false })
  @Unique('Duplicate url', ['url'])
  url: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    type => NewToUser,
    newToUser => newToUser.news,
  )
  public newsToUser: NewToUser[];
}
