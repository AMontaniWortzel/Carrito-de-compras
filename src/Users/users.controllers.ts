import { BadRequestException, Controller, Get, HttpCode, Param, ParseUUIDPipe, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/Auth/guard/auth.guard";
import { RolesGuard } from "src/Auth/guard/roles.guard";
import { Role } from "src/roles.enum";
import { Roles } from "src/Decorators/role.decorators";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller('users')

export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    getUsers(@Query("page") page: number, @Query("limit") limit: number){
        if (page && limit){
            return this.usersService.getUsers(page, limit);
        }
        return this.usersService.getUsers(1, 5)
        
    }
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    getUser(@Param("id", new ParseUUIDPipe({
            version: '4',
            exceptionFactory: () =>
              new BadRequestException(
                'The format of the User ID is not valid.',
              ),
          })) id: string ){
        return this.usersService.getUser(id);  
    }
    

}