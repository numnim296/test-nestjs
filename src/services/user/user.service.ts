import { MailDto } from './../../dto/mail.dto';
import { MailService } from './../mail/mail.service';
import { ResetPasswordDto, UpdateUserDto } from './../../dto/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FastifyReply } from 'fastify'
import { CreateUserDto } from 'src/dto/user.dto';
import { hash } from 'src/helpers/hash';
import { randomBytes } from 'crypto'
import { Prisma } from '@prisma/client';
import { set } from 'lodash'

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
        private readonly mailDto: MailDto
    ) { }

    async getAllUser(pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let data = await this.prismaService.users.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    mobile: true,
                    created_at: true,
                    status: true,
                    role_id: true
                },
                take: take,
                skip: skip,
            })
            let count = await this.prismaService.users.count()

            return res.status(200).send({
                data: data,
                pages: parseInt(pages),
                size: parseInt(size),
                count: count,
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

    async addUserProfile(body: CreateUserDto, res: FastifyReply) {
        try {

            const passwordRandom = randomBytes(8).toString('base64')
            console.log("password - ", passwordRandom);
            // /clUsSOA8Lc=
            //send password to email
            // this.mailDto.to = body.email
            // this.mailDto.from = ""
            // this.mailDto.subject = "smartmeter password"
            // this.mailDto.html = `
            // <!DOCTYPE html>
            // <html lang="en">
            // <head>
            //     <meta charset="UTF-8">
            //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
            //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //     <title>Smart Meter</title>
            // </head>
            // <body> 
            //     <div>
            //         <p>รหัสผ่านคือ ${passwordRandom}</p>
            //     </div>
            // </body>
            // </html>
            //  `
            // const [isSendMail, errorMessage] = await this.mailService.sendMail(this.mailDto)
            // if (isSendMail) {
            const password = hash(passwordRandom)

            await this.prismaService.users.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: password.hash,
                    role_id: body.role_id,
                    created_at: new Date(),
                    salt: password.salt,
                    status: 1,
                    mobile: body.mobile,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "create user profile success!"
            })
            // } else {
            //     throw new HttpException({
            //         status: HttpStatus.INTERNAL_SERVER_ERROR,
            //         error: 'cannot send password to email. please check your mail and try again.',
            //     }, HttpStatus.INTERNAL_SERVER_ERROR, {
            //         cause: errorMessage
            //     });
            // }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'cannot insert data',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }

    async updateUserProfile(body: UpdateUserDto, res: FastifyReply) {
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

    async deleteUserProfile(id: string, res: FastifyReply) {
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

    // send data from website when user click
    async resetPassword(body: ResetPasswordDto, res: FastifyReply) {
        try {
            await this.prismaService.users.update({
                where: {
                    id: body.id,
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
                    role_id: true
                },
                take: take,
                skip: skip,
            })
            let count = await this.prismaService.users.count({
                where
            })

            return res.status(200).send({
                data: data,
                pages: parseInt(pages),
                size: parseInt(size),
                count: count,
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
