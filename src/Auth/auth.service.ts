import { BadRequestException, Injectable} from '@nestjs/common';
import { LoginDto } from './login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Users/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/Users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
     private readonly jwtService: JwtService
  ) {}
     async signIn(credentials: LoginDto) {
            const findUser = await this.usersRepository.findOneBy({
          email: credentials.email,
    });

    if (!findUser) throw new BadRequestException('Bad credentials');

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      findUser.password
    )

    if (!passwordMatch) throw new BadRequestException("Bad credentials")
      const payload = {
    id:findUser.id,
    email: findUser.email,
  isAdmin: findUser.isAdmin}

      const token = this.jwtService.sign(payload) 

      return token
    }

  async signUp(user: CreateUserDto) {

    const findUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (findUser) throw new BadRequestException('User already registered');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersRepository.save({
      ...user,
      password: hashedPassword,
      isAdmin: false,
    });

  return plainToInstance(User, newUser);
  }
}
