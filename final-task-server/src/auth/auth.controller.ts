import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SinginDto, SignupDto } from 'src/models/user.model';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) data: SignupDto) {
    console.log(data);
    return this.authService.signup(data);
  }

  @Post('/signin')
  singin(@Body(ValidationPipe) data: SinginDto) {
    return this.authService.signin(data);
  }
}
