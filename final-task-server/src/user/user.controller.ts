import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserDecorator } from 'src/auth/user.decorator';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@UserDecorator() { nickName }: User) {
    return this.authService.findCurrentUser(nickName);
  }

  @Put()
  @UseGuards(AuthGuard())
  update(
    @UserDecorator() { nickName }: User,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateUserDto,
  ) {
    return this.authService.updateUser(nickName, data);
  }

  @Delete()
  @UseGuards(AuthGuard())
  delete(@UserDecorator() { nickName }: User) {
    return this.userService.deleteUser(nickName);
  }
}
