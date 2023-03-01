import { IsNotEmpty, IsString, isString } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}


export class resetDto {
  @IsNotEmpty()
  @IsString()
  email: string

}
