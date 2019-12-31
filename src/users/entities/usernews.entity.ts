import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from 'src/news/entities/news.entity';
import { Users } from './user.entity';

@Entity()
export class NewToUser {
  @PrimaryGeneratedColumn()
  public newToUserId!: number;

  @ManyToOne(
    type => News,
    news => news.newsToUser,
  )
  public news!: News;

  @ManyToOne(
    type => Users,
    user => user.newsToUser,
  )
  public user!: Users;

  @Column({ nullable: true })
  sharedBy!: number;

  @Column({ default: new Date() })
  createdAt!: Date;
}
