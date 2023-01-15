import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Feed } from './feed.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  tag_id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Feed, (feed) => feed.tag)
  feed: Feed;
}
