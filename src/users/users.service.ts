import { Injectable, Logger, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.model';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(userDto: UserDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.lastname = userDto.lastname;
    user.age = userDto.age;

    return this.usersRepository.save(user);
  }

  async update(id: number, userDto: UserDto): Promise<User> {

    const user = await this.usersRepository.preload({
      id: id,
      ...userDto
    });

    if ( !user ) throw new NotFoundException(`User with id: ${ id } not found`);

    try {
      await this.usersRepository.save( user );
      return user;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<UserDto[]>{
    let list: UserDto[] = await this.usersRepository.find()
    //let list = await this.usersRepository.query("select * from user where id=?", [2])
    
    return list;
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}