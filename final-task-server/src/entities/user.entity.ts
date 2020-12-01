import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import * as bcrypt from 'bcryptjs';
import { Company } from './company.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  nickName: string;

  @Column({ unique: true })
  phoneNumb: string;

  @Column()
  description: string;

  @Column()
  position: string;

  @OneToMany((type) => Company, (company) => company.owner)
  companies: Company;

  // @ManyToMany((type) => Company, (company) => company.favoritedBy)
  // @JoinColumn()
  // favorites: Company[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON(user?: User) {
    return classToPlain(user);
  }

  // toProfile(user?: User) {
  //   let following = null;
  //   if (user) {
  //     following = this.followers.includes(user);
  //   }
  //   const profile: any = this.toJSON();
  //   delete profile.followers;
  //   return { ...profile, following };
  // }
}
