import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { Users } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserNewsService } from './services/usernews.service';
import { NewToUser } from './entities/usernews.entity';
import { NewsModule } from 'src/news/news.module';
import { UserRepository } from './repositories/userRepository';
import { UserNewsRepository } from './repositories/userNewsRepository';
import { TransformDataService } from './services/transformData.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      Users,
      NewToUser,
      UserRepository,
      UserNewsRepository,
    ]),
    AuthModule,
    NewsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserNewsService, TransformDataService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
