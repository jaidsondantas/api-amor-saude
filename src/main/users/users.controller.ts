import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@ApiHeader({
  name: 'Authorization',
  schema: {
    default: 'Bearer {{token}}',
  },
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
