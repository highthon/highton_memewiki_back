import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Feed } from './feed.entity';
import { Like } from './like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @OneToMany(() => Feed, (feed) => feed.user)
  feed: Feed[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[];
}
