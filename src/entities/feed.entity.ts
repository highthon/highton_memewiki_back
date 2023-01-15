import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @Column()
  user_id: number;

  @Column()
  tag_id: string;

  @ManyToOne(() => User, (user) => user.feed)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Like, (like) => like.feed)
  like: Like[];

  @ManyToOne(() => Tag, (tag) => tag.feed)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
