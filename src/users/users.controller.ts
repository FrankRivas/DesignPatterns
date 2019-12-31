import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  UseGuards,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from '../users/dto/register.dto';
import { ValidationRegisterPipe } from './pipes/register.pipe';
import { Users } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserNewsService } from './usernews.service';
import { ShareDto } from './dto/share.dto';
import { ValidationSharePipe } from './pipes/share.pipe';
import { UserDto } from './dto/users.dto';
import { SaveNewsDto } from './dto/savenews.dto';
import { ValidationSaveNewsPipe } from './pipes/savenews.pipe';
import { PasswordDto } from './dto/password.dto';
import { ValidationPasswordPipe } from './pipes/password.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly userNewService: UserNewsService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationRegisterPipe)
  @Post('/signup')
  signup(@Body() user: RegisterDto): Promise<Users | undefined> {
    return this.userService.singup(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signin(@Body() user: UserDto): Promise<{}> {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationSaveNewsPipe)
  @Post('/:userId/save')
  async save(
    @Body() article: SaveNewsDto,
    @Param('userId') userId: number,
  ): Promise<{}> {
    return this.userNewService.saveArticle(article.url, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/news')
  getArticles(@Param('userId') userId: number): {} {
    return this.userNewService.getArticles(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationSharePipe)
  @Post('/:userId/share')
  async share(
    @Body() article: ShareDto,
    @Param('userId') userId: number,
  ): Promise<{}> {
    return this.userNewService.saveArticle(article.url, article.user, userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPasswordPipe)
  @Post(':userId/changePassword')
  changePassword(
    @Body() pass: PasswordDto,
    @Param('userId') userId: number,
  ): Promise<Users | undefined> {
    return this.userService.changePassword(userId, pass.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:userId/shared')
  sharedArticles(@Param('userId') userId: number): {} {
    return this.userNewService.getSharedArticles(userId);
  }
}
