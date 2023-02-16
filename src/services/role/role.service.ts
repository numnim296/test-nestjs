import { UpdateUserRoleDto, UserRoleDto } from './../../dto/role.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FastifyReply, FastifyRequest } from 'fastify'
import { randomBytes } from 'crypto';
import { hash } from 'src/helpers/hash';


@Injectable()
export class RoleService {
    constructor(private readonly prismaService: PrismaService) { }

    async getAllUserRole(pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let data = await this.prismaService.users.findMany({
                select: {
                    id: true,
                    email: true,
                    status: true,
                    // role_id: true,
                    role: true

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

    async searchUserRole(word: string, pages: string, size: string, res: FastifyReply) {

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
                            role: {
                                name: {
                                    contains: word,
                                }
                            }
                        }
                    ],
                },
                select: {
                    id: true,
                    email: true,
                    status: true,
                    role_id: true,
                    role: true
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




    async addUserRole(body: UserRoleDto, res: FastifyReply) {
        try {

            const passwordRandom = randomBytes(8).toString('base64')
            console.log("password - ", passwordRandom);
            // /clUsSOA8Lc=
            //send password to email
            const password = hash(passwordRandom)
            await this.prismaService.users.create({
                data: {
                    name: '',
                    email: body.email,
                    password: password.hash,
                    role_id: body.role_id,
                    created_at: new Date(),
                    salt: password.salt,
                    status: 1,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "create user role success!"
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

    async updateUserRole(body: UpdateUserRoleDto, res: FastifyReply) {
        try {
            await this.prismaService.users.update({
                where: {
                    id: body.id,
                },
                data: {

                    email: body.email,
                    role_id: body.id
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "update user role success!"
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
}
