import { GetCurrentUserEmail } from './../../decorators/get-current-user-email.decorator';
import { CreateDeviceDto, UpdateDeviceDto } from './../../dto/device.dto';
import { DeviceService } from './../../services/device/device.service';
import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply, FastifyRequest } from 'fastify'
import { JwtStrategy } from '../../jwt.strategy';
import { GetCurrentUserId } from 'src/decorators';

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
        return this.deviceService.searchData(params.type, params.word, params.pages, params.size, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createDevice(@Body() body: CreateDeviceDto, @GetCurrentUserEmail() userEmail: string, @Res() res: FastifyReply) {
        return this.deviceService.addDevice(body,userEmail, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editDevice(@Body() body: UpdateDeviceDto, @GetCurrentUserEmail() userEmail: string, @Res() res: FastifyReply) {
        return this.deviceService.updateDevice(body,userEmail, res)
    }



}
