import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/request/signIN.request';
import { SignUpDto } from './dto/request/signUp.request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userSerivce: UserService) {}
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.userSerivce.signIn(signInDto);
  }
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userSerivce.signUp(signUpDto);
  }
}
