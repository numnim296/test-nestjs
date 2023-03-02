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
                    code: true,
                    name: true,
                    brand: true,
                    model: true,
                    sn: true,
                    start_date: true,
                    end_date: true,
                    note: true,
                    status: true,
                    created_at: true
                },
                take: take,
                skip: skip,
            })

            let count = await this.prismaService.devices.count({})
            return res.status(200).send({
                data: data,
                pages: parseInt(pages),
                size: parseInt(size),
                count: count
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'data not found',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    async addDevice(body: CreateDeviceDto, userEmail: string, res: FastifyReply) {
        try {
            var start_date = body.start_date;
            var end_date = body.end_date;
            var startDate = new Date(start_date);
            var endDate = new Date(end_date);


            await this.prismaService.devices.create({
                data: {
                    code: body.code,
                    name: body.name,
                    brand: body.brand,
                    model: body.model,
                    sn: body.sn,
                    start_date: startDate,
                    end_date: endDate,
                    note: body.note,
                    status: body.status,
                    created_by: userEmail,
                    updated_by: userEmail,
                    updated_at: new Date(),
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

    async updateDevice(body: UpdateDeviceDto, userEmail: string, res: FastifyReply) {
        try {
            await this.prismaService.devices.update({
                where: {
                    id: body.id,
                },
                data: {
                    code: body.code,
                    name: body.name,
                    brand: body.brand,
                    model: body.model,
                    sn: body.sn,
                    start_date: body.start_date,
                    end_date: body.end_date,
                    note: body.note,
                    status: body.status,
                    updated_by: userEmail,
                    updated_at: new Date()
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

    async deleteDevice(id: string, res: FastifyReply) {
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


    async searchData(type: string, word: string, pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let where = {}
            if (type == 'device_id') {
                where = {
                    device_id: {
                        contains: word
                    }
                }
            } else if (type == 'device_name') {
                where = {
                    device_name: {
                        contains: word
                    }
                }
            } else if (type == 'brand') {
                where = {
                    brand: {
                        contains: word
                    }
                }
            } else if (type == 'model') {
                where = {
                    model: {
                        contains: word
                    }
                }
            }
            let data = await this.prismaService.devices.findMany({
                where,
                select: {
                    id: true,
                    code: true,
                    name: true,
                    brand: true,
                    model: true,
                    sn: true,
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
                pages: parseInt(pages),
                size: parseInt(size),
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'data not found',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
}
