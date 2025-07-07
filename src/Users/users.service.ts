import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getUsers(page: number, limit: number) {
    let users = await this.userRepository.find();
    
    const start = (page - 1) * limit;
    const end = start + limit;
    users = users.slice(start, end);

    return users.map(({ password, isAdmin, ...user }) => user);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, isAdmin, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

}
