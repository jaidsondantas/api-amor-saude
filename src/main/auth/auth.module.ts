import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { GenerateHash } from 'src/shared/helpers/generate-hash';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from '../users/user.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    SharedModule,
    JwtModule.registerAsync({
      imports: undefined,
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '360d' },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  providers: [
    AuthService,
    GenerateHash,
    JwtStrategy,
    LocalStrategy,
    UserRepository,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
