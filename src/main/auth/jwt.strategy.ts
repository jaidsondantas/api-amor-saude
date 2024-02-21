import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'email ou senha incorretos, digite novamente!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.userRepository.findOneBy({
      id: payload.sub,
    });
  }
}
