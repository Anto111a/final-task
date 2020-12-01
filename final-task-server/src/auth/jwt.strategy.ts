import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { OwnerPayload } from 'src/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Baerer'),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: OwnerPayload) {
    const { nickName } = payload;
    const user = this.userRepo.find({ where: { nickName } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
