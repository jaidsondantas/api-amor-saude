import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Invalid payload or missing sub property',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.userRepository.findOneBy({
      id: payload.sub,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'User not found for the given payload',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
