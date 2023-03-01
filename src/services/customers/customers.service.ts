import { CreateCustomersDto } from './../../dto/customers.dto';
import { ResetPasswordDto, UpdateUserDto } from './../../dto/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FastifyReply } from 'fastify'
import { CreateUserDto } from 'src/dto/user.dto';
import { hash } from 'src/helpers/hash';
import { randomBytes } from 'crypto'

@Injectable()
export class CustomersService {
    constructor(private readonly prismaService: PrismaService) { }

    async getAllCustomer(pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let data = await this.prismaService.customers.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    mobile: true,
                    created_at: true,
                    address: true,
                    district: true,
                    sub_district: true,
                    province: true,
                    postal_code: true,
                    user: {
                        select: {
                            id: true,
                            status: true,
                        }
                    },
                },
                take: take,
                skip: skip,
            })
            // delete data["user"]["name"]
            let count = await this.prismaService.customers.count()

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

    async addCustomer(body: CreateCustomersDto, res: FastifyReply) {
        try {

            const passwordRandom = randomBytes(8).toString('base64')
            console.log("password - ", passwordRandom);
            // /clUsSOA8Lc=
            //send password to email
            const password = hash(passwordRandom)
            let dataUser = await this.prismaService.users.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: password.hash,
                    role_id: 3,
                    created_at: new Date(),
                    salt: password.salt,
                    status: 1,
                    mobile: body.mobile,
                    created_by: "",
                    updated_by: "",
                    updated_at: new Date()
                },
            })

            await this.prismaService.customers.create({
                data: {
                    user_id: dataUser["id"],
                    name: body.name,
                    email: body.email,
                    mobile: body.mobile,
                    address: body.address,
                    sub_district: body.sub_district,
                    district: body.district,
                    province: body.province,
                    postal_code: body.postal_code,
                    created_by: '',
                    updated_by: '',
                    created_at: new Date()
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "create customer success!"
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

    async updateCustomer(body: UpdateUserDto, res: FastifyReply) {
        try {
            await this.prismaService.users.update({
                where: {
                    id: body.id,
                },
                data: {
                    name: body.name,
                    email: body.email,
                    mobile: body.mobile,
                    status: body.status,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "update user profile success!"
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

    async deleteCustomer(id: string, res: FastifyReply) {
        try {

            await this.prismaService.users.update({
                where: {
                    id: Number(id),
                },
                data: {
                    status: 0,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "delete user profile success!"
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

    async resetPassword(body: ResetPasswordDto, res: FastifyReply) {
        try {
            await this.prismaService.users.update({
                where: {
                    email: body.email,
                },
                data: {
                    password: hash(body.password).hash,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "reset password success!"
            })
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'cannot reset password',
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
            if (type == 'name') {
                where = {
                    name: {
                        contains: word
                    }
                }
            } else if (type == 'email') {
                where = {
                    email: {
                        contains: word
                    }
                }
            } else if (type == 'mobile') {
                where = {
                    mobile: {
                        contains: word
                    }
                }
            }
            let data = await this.prismaService.users.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    mobile: true,
                    created_at: true,
                    status: true,
                    role: true,
                },
                take: take,
                skip: skip,
            })

            return res.status(200).send({
                data: data,
                pages: parseInt(pages),
                size: parseInt(size)
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
