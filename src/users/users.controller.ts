import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { RegisterDto } from '../users/dto/register.dto';
import { Users } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserNewsService } from './services/usernews.service';
import { ShareDto } from './dto/sharenews.dto';
import { UserDto } from './dto/users.dto';
import { SaveNewsDto } from './dto/savenews.dto';
import { PasswordDto } from './dto/password.dto';
import { User } from './decorators/userDecorator';
import { UserEntitySerializer } from './serializers/userSerializer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly userNewService: UserNewsService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signup(@Body() user: RegisterDto): Promise<Users | undefined> {
    try {
      return new UserEntitySerializer(await this.userService.singup(user));
    } catch {
      throw new ConflictException();
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signin(@User() user: UserDto): Promise<{}> {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:userId/save')
  async save(
    @Body() article: SaveNewsDto,
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<{}> {
    return this.userNewService.saveArticle(article.url, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/news')
  getArticles(@Param('userId', new ParseIntPipe()) userId: number): {} {
    return this.userNewService.getArticles(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:userId/share')
  async share(
    @Body() article: ShareDto,
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<{}> {
    return this.userNewService.saveArticle(article.url, article.user, userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':userId/changePassword')
  async changePassword(
    @Body() pass: PasswordDto,
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<UserEntitySerializer | undefined> {
    try {
      return new UserEntitySerializer(await this.userService.changePassword(userId, pass.password));
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId/shared')
  sharedArticles(@Param('userId', new ParseIntPipe()) userId: number): {} {
    return this.userNewService.getSharedArticles(userId);
  }
}
