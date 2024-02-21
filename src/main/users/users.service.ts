import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly _saltOrRounds = 10;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const preparedUser = await this.prepare(createUserDto);

    try {
      const user = this.userRepository.create(preparedUser);
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
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
    const _user: Partial<User> = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    return _user;
  }
}
