import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Feed } from './feed.entity';
import { User } from './user.entity';

@Entity()
export class Like {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  feed_id: number;

  @JoinColumn({ name: 'feed_id' })
  @ManyToOne(() => Feed, (feed) => feed.like)
  feed: Feed;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.like)
  user: User;
}
