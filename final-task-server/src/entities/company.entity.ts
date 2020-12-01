import { Entity, Column, BeforeInsert, ManyToOne } from 'typeorm';
import { classToPlain } from 'class-transformer';
import * as slugify from 'slug';
import { AbstractEntity } from './abstract-entity';
import { User } from './user.entity';

@Entity('companies')
export class Company extends AbstractEntity {
  @Column()
  slug: string;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  serviceOfActivity: string;

  @Column()
  nuberOfEmloyees: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @ManyToOne(() => User, (user) => user.companies, { eager: true })
  owner: User;

  @BeforeInsert()
  generateSlug() {
    this.slug =
      slugify(this.name, { lower: true }) +
      '-' +
      Math.random().toString(36).substring(7);
  }

  toJSON(company: Company) {
    return classToPlain(company);
  }
}
