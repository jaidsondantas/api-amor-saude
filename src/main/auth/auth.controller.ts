import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDto): Promise<AccessToken> {
    return await this._authService.validateUser({
      email: body.email,
      password: body.password,
    });
  }
}
