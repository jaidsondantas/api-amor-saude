import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenerateHash } from 'src/shared/helpers/generate-hash';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable({
  scope: Scope.DEFAULT,
})
export class UsersService {
  private readonly _saltOrRounds = 10;

  constructor(
    private generateHash: GenerateHash,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const _user = await this.prepare(createUserDto);

    try {
      const user: User = this.userRepository.create(_user)[0];
      return this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async prepare(user: CreateUserDto | UpdateUserDto): Promise<Partial<User>> {
    const saltOrRounds = this._saltOrRounds;
    const _user: Partial<User> = {
      name: user.name,
      email: user.email,
      password: await this.generateHash.generateHash(
        user.password,
        saltOrRounds,
      ),
      salt: await this.generateHash.genSalt(),
    };
    return _user;
  }
}
