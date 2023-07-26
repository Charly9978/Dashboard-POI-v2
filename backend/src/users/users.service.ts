import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOneByOrFail({ id });
    Object.assign(userToUpdate, updateUserDto);
    return this.userRepository.save(userToUpdate);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
