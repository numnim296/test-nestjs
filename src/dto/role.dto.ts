import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UserRoleDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsNumber()
    role_id: number

}

export class UpdateUserRoleDto {
    @IsNotEmpty()
    @IsString()
    id: number

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsNumber()
    role_id: number

}






