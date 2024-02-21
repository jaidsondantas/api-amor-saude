import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessToken } from './dto/access-token';

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
    const user = await this._userService.findByEmail(credentials.email);

    if (user && credentials.password === user.password) {
      return this.generateToken(user);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Senha ou usuário incorretos, revise suas credenciais!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async generateToken(user: any): Promise<AccessToken> {
    const payload = { username: user.email, sub: user.id };
    const accessToken = new AccessToken();
    accessToken.accessToken = this._jwtService.sign(payload, {
      expiresIn: '365d',
    });
    accessToken.user = {
      email: user.email,
      name: user.name,
    };
    return accessToken;
  }
}
