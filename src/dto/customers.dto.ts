import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCustomersDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    mobile: string

    @IsNotEmpty()
    @IsString()
    address: string


    @IsNotEmpty()
    @IsString()
    sub_district: string


    @IsNotEmpty()
    @IsString()
    district: string


    @IsNotEmpty()
    @IsString()
    province: string


    @IsNotEmpty()
    @IsString()
    postal_code: string
}

export class UpdateCustomersDto {
    @IsNotEmpty()
    @IsString()
    email: string

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

    @IsNotEmpty()
    @IsString()
    address: string


    @IsNotEmpty()
    @IsString()
    sub_district: string


    @IsNotEmpty()
    @IsString()
    district: string


    @IsNotEmpty()
    @IsString()
    province: string


    @IsNotEmpty()
    @IsString()
    postal_code: string
}