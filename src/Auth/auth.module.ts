import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './signin.auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
