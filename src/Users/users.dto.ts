import { IsEmail, IsString, Matches, IsNumber, MinLength, MaxLength, IsNotEmpty } from "class-validator";



export class CreateUserDto {

  /**
   * @example django@gmail.com
   */
  @IsString()
  @IsEmail()
   @IsNotEmpty()
  email: string;

  /**
   * @example Django
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * @example Abcdef5$8
   */
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/, {
    message:
      'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial (!@#$%^&)',
  })
  @MinLength(8)
  @MaxLength(15)
   @IsNotEmpty()
  password: string;


    /**
   * @example Urquiza 
   */
   @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

    /**
   * @example 3416630225
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

    /**
   * @example Argentina
   */
  @MinLength(5)
  @MaxLength(20)
   @IsNotEmpty()
  country: string;

    /**
   * @example Rosario
   */
  @MinLength(5)
  @MaxLength(20)
   @IsNotEmpty()
  city: string;
}

export class UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
  address?: string;
  phone?: number;
  country?: string;
  city?: string;
}
