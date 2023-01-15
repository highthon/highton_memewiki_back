import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  queryPasswordByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.password'])
      .where('user.email := email', { email })
      .getOne();
  }
  //exist 만 볼 수 있는 코드 있으면 수정
  async isExist(email: string) {
    return !!(await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email'])
      .where('user.email = :email', { email })
      .getOne());
  }

  create(email: string, nickname: string, password: string) {
    return this.userRepository.insert({
      email,
      nickname,
      password,
    });
  }

  async findOne(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.password'])
      .where('user.email = :email', { email })
      .getOne();
  }
}
