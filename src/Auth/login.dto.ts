import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "src/Users/users.dto";

export class LoginDto extends PickType(CreateUserDto, ["email", "password"]) {   


}


