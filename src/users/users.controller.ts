import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Patch,
    ParseIntPipe,
    Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.model';
import { User } from './entities/user.entity';
  
@Controller('users')
export class UsersController {
  private readonly logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.update( id, userDto );
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    Logger.log('Pruebass', "UsersController");
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}