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

}



export class UpdateUserDto extends CreateUserDto {
    @IsOptional()
    @IsString()
    id: number

}

export class ResetPasswordDto {
    @IsOptional()
    @IsString()
    id: number

    @IsNotEmpty()
    @IsString()
    password: string


}


