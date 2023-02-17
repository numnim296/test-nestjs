import { CreateDeviceDto, UpdateDeviceDto } from './../../dto/device.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
    constructor(private prismaService: PrismaService) { }

    async getAllDevice(pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let data = await this.prismaService.devices.findMany({
                select: {
                    id: true,
                    device_id: true,
                    device_name: true,
                    brand: true,
                    model: true,
                    sn: true,
                    meter_number: true,
                    start_date: true,
                    end_date: true,
                    note: true,
                    status: true,
                    created_at: true
                },
                take: take,
                skip: skip,
            })

            return res.status(200).send({
                data: data,
                pages: pages,
                size: size
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'cannot found data',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    async addDevice(body: CreateDeviceDto, res: FastifyReply) {
        try {

            await this.prismaService.devices.create({
                data: {
                    device_id: body.device_id,
                    device_name: body.device_name,
                    brand: body.brand,
                    model: body.model,
                    sn: body.sn,
                    meter_number: body.meter_number,
                    start_date: body.start_date,
                    end_date: body.end_date,
                    note: body.note,
                    status: body.status,
                    created_at: new Date()
                },
            })

            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "create device success!"
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'cannot insert data',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    async updateDevice(body: UpdateDeviceDto, res: FastifyReply) {
        try {
            await this.prismaService.devices.update({
                where: {
                    id: body.id,
                },
                data: {
                    device_id: body.device_id,
                    device_name: body.device_name,
                    brand: body.brand,
                    model: body.model,
                    sn: body.sn,
                    meter_number: body.meter_number,
                    start_date: body.start_date,
                    end_date: body.end_date,
                    note: body.note,
                    status: body.status,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "update device success!"
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'cannot update data',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    async deleteUserProfile(id: string, res: FastifyReply) {
        try {

            await this.prismaService.devices.update({
                where: {
                    id: Number(id),
                },
                data: {
                    status: 0,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "delete device success!"
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'cannot delete data',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }


    async searchData(word: string, pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let data = await this.prismaService.devices.findMany({
                where: {
                    OR: [
                        {
                            device_id: {
                                contains: word,
                            },
                        },
                        {
                            device_name: {
                                contains: word,
                            },
                        },
                        {
                            brand: {
                                contains: word,
                            },
                        },
                        {
                            model: {
                                contains: word,
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    device_id: true,
                    device_name: true,
                    brand: true,
                    model: true,
                    sn: true,
                    meter_number: true,
                    start_date: true,
                    end_date: true,
                    note: true,
                    status: true,
                    created_at: true
                },
                take: take,
                skip: skip,
            })

            return res.status(200).send({
                data: data,
                pages: pages,
                size: size
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'cannot found data',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
}
