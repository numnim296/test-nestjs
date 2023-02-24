import { CreateDeviceDto, UpdateDeviceDto } from './../../dto/device.dto';
import { DeviceService } from './../../services/device/device.service';
import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply } from 'fastify'

@Controller('device')
export class DeviceController {
    constructor(private deviceService: DeviceService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    getAllDevice(@Query() params: any, @Res() res: FastifyReply) {
        return this.deviceService.getAllDevice(params.pages, params.size, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    searchDevice(@Query() params: any, @Res() res: FastifyReply) {
        return this.deviceService.searchData(params.word, params.pages, params.size, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createDevice(@Body() body: CreateDeviceDto, @Res() res: FastifyReply) {
        return this.deviceService.addDevice(body, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editDevice(@Body() body: UpdateDeviceDto, @Res() res: FastifyReply) {
        return this.deviceService.updateDevice(body, res)
    }



}
