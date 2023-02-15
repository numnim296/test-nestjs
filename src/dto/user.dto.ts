import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    salt: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    role_id: number

    @IsNotEmpty()
    @IsString()
    mobile: string

    @IsNotEmpty()
    @IsNumber()
    status: number


}



export class UpdateUserDto  {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    email: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    mobile: string

    @IsOptional()
    @IsNumber()
    status: number

}

export class ResetPasswordDto {
    @IsOptional()
    @IsString()
    id: number

    @IsNotEmpty()
    @IsString()
    password: string


}


