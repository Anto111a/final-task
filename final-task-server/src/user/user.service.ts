import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async deleteUser(nickName) {
    const user = await this.userRepo.findOne({ where: { nickName } });
    await this.userRepo.remove(user);
    return user;
  }
}
