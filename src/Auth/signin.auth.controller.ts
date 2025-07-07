import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { CreateUserDto } from "src/Users/users.dto";



@Controller('auth')

export class AuthController{
    constructor (private readonly authService: AuthService){}

    @Post("/signin")
    signIn(@Body() credentials: LoginDto){
        return this.authService.signIn(credentials);
    }

    @Post("/signup")
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user)
    }
}