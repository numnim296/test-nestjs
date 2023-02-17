import { MailDto } from './../../dto/mail.dto';
import { MailService } from './../mail/mail.service';
import { ResetPasswordDto, UpdateUserDto } from './../../dto/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FastifyReply } from 'fastify'
import { CreateUserDto } from 'src/dto/user.dto';
import { hash } from 'src/helpers/hash';
import { randomBytes } from 'crypto'

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

    async addUserProfile(body: CreateUserDto, res: FastifyReply) {
        try {

            const passwordRandom = randomBytes(8).toString('base64')
            console.log("password - ", passwordRandom);
            // /clUsSOA8Lc=
            //send password to email
            // this.mailDto.to = ""
            // this.mailDto.from = ""
            // this.mailDto.subject = ""
            // this.mailDto.html = ""
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
            // return res.status(HttpStatus.OK).send({
            //     status: HttpStatus.OK,
            //     message: "create user profile success!"
            // })
            // } else {
            // throw new HttpException({
            //     status: HttpStatus.INTERNAL_SERVER_ERROR,
            //     error: 'cannot send password to email. please check your mail and try again.',
            // }, HttpStatus.INTERNAL_SERVER_ERROR, {
            //     cause: errorMessage
            // });
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

    async searchData(word: string, pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let data = await this.prismaService.users.findMany({
                where: {
                    OR: [
                        {
                            email: {
                                contains: word,
                            },
                        },
                        {
                            mobile: {
                                contains: word,
                            },
                        },
                        {
                            name: {
                                contains: word,
                            },
                        },
                    ],
                },
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
