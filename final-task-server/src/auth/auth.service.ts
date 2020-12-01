import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SinginDto, SignupDto, UpdateUserDto } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(data: SignupDto) {
    try {
      const user = this.userRepo.create(data);

      await user.save();

      const payload = { nickName: user.nickName };
      const token = this.jwtService.sign(payload);
      return { user: { ...user, token } };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('please check the data');
      }
      throw new InternalServerErrorException();
    }
  }

  async signin({ email, password }: SinginDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const payload = { nickName: user.nickName };
      const token = this.jwtService.sign(payload);

      return { user: { ...user, token } };
    } catch (err) {
      throw new UnauthorizedException('Invalid password');
    }
  }

  async findCurrentUser(nickName: string) {
    const user = await this.userRepo.findOne({ where: { nickName } });
    const payload = { nickName };
    const token = this.jwtService.sign(payload);

    return { user: { ...user, token } };
  }

  async updateUser(nickName: string, data: UpdateUserDto) {
    await this.userRepo.update({ nickName }, data);
    const user = await this.userRepo.findOne({ where: { nickName } });
    const payload = { nickName };
    const token = this.jwtService.sign(payload);

    return { user: { ...user, token } };
  }
}
