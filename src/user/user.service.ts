import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { SignUpRequest } from './dto/request/signUp.request';
import { SignInRequest } from './dto/request/signIN.request';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}
  private async getUserBy(email: string) {
    return await this.userRepository.queryPasswordByEmail(email);
  }
  verifyToken() {
    return;
  }

  async signUp({ email, nickname, password }: SignUpRequest) {
    if (await this.userRepository.isExist(email)) {
      throw new BadRequestException('유저가 존재합니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.create(email, nickname, hashedPassword);
  }

  async signIn({ email, password }: SignInRequest) {
    const currentUser = await this.userRepository.findOne(email);
    if (!currentUser) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }
    if (!(await bcrypt.compare(password, currentUser.password))) {
      throw new BadRequestException('비밀번호를 잘못 입력하셨습니다.');
    }

    const accessToken = this.authService.generateToken(`${currentUser.id}`);
    return {
      access_token: accessToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.getUserBy(email);
    if (!user) {
      return new NotFoundException('유저가 존재하지 않습니다.');
    }
    const passwordVaild = await bcrypt.compare(password, user.password);

    if (passwordVaild && user) {
      return user;
    }
    return null;
  }
}
