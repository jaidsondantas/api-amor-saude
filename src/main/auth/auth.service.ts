import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessToken } from './dto/access-token';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UsersService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(credentials: {
    email: string;
    password: string;
  }): Promise<AccessToken> {
    const _user = await this._userService.findByEmail(credentials.email);
    if (_user && (await bcrypt.compare(credentials.password, _user.password)))
      return this.generateToken(_user);

    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'email ou senha incorretos, digite novamente!',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  async generateToken(user: any): Promise<AccessToken> {
    const payload = { username: user.email, sub: user.id };
    const accessToken = new AccessToken();
    accessToken.accessToken = this._jwtService.sign(payload, {
      expiresIn: '365d',
    });
    accessToken.user = user;
    return accessToken;
  }
}
