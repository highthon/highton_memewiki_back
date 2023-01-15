import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(id: string) {
    const tokenExp = 60 * 60 * 2;
    return this.jwtService.sign(
      { sub: `${id}` },
      {
        secret: process.env.JWT_SECRET_KEY,
        algorithm: 'HS256',
        expiresIn: tokenExp,
      },
    );
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token.split(' ')[1], {
        secret: process.env.JWT_SECRET_KEY,
        ignoreExpiration: false,
      });
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
