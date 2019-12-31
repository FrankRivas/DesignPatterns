import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { Users } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserNewsService } from './usernews.service';
import { NewToUser } from './entities/usernews.entity';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Users, NewToUser]),
    AuthModule,
    NewsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserNewsService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
