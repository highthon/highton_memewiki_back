import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from 'src/entities/feed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectRepository(Feed) private readonly feedRepository: Repository<Feed>,
  ) {}

  create() {
    this.feedRepository.createQueryBuilder('feed').select([]).where('', {});
  }

  findAll() {}

  queryByTag() {}

  queryMine() {}
}
