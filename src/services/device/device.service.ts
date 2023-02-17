import { CreateDeviceDto, UpdateDeviceDto } from './../../dto/device.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { FastifyReply } from 'fastify';
import { hash } from 'src/helpers/hash';
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
                    // email: true,
                    // name: true,
                    // mobile: true,
                    // created_at: true,
                    // status: true,
                    // role_id: true,
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

            const passwordRandom = randomBytes(8).toString('base64')
            console.log("password - ", passwordRandom);
            // /clUsSOA8Lc=
            //send password to email
            const password = hash(passwordRandom)

            // await this.prismaService.devices.create({
            // data: {
            // name: body.name,
            // email: body.email,
            // password: password.hash,
            // role_id: body.role_id,
            // created_at: new Date(),
            // salt: password.salt,
            // status: 1,
            // mobile: body.mobile,
            // },
            // })

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
                    // id: body.id,
                },
                data: {
                    // name: body.name,
                    // email: body.email,
                    // mobile: body.mobile,
                    // status: body.status,
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
                    // status: 0,
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
                        // {
                        //     email: {
                        //         contains: word,
                        //     },
                        // },
                        // {
                        //     mobile: {
                        //         contains: word,
                        //     },
                        // },
                        // {
                        //     name: {
                        //         contains: word,
                        //     },
                        // },
                    ],
                },
                select: {
                    id: true,
                    // email: true,
                    // name: true,
                    // mobile: true,
                    // created_at: true,
                    // status: true,
                    // role_id: true
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
