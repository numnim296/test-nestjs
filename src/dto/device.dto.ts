import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    code: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    brand: string

    @IsNotEmpty()
    @IsString()
    model: string

    @IsNotEmpty()
    @IsString()
    sn: string

    @IsNotEmpty()
    @IsDateString()
    start_date: string

    @IsNotEmpty()
    @IsDateString()
    end_date: string

    @IsNotEmpty()
    @IsString()
    note: string

    @IsNotEmpty()
    @IsNumber()
    status: number


}



export class UpdateDeviceDto extends CreateDeviceDto {

    @IsNotEmpty()
    @IsNumber()
    id: number


}

