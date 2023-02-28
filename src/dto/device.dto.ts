import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    device_id: string

    @IsNotEmpty()
    @IsString()
    device_name: string

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
    @IsNumber()
    meter_number: number

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

