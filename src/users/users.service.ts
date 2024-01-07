import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.save({
      nome: createUserDto.nome,
      sobrenome: createUserDto.sobrenome,
    });
    return newUser;
  }

  async findAll() {
    const allUsers = this.userRepository.find();
    return allUsers;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return this.userRepository.delete(user);
  }
}
