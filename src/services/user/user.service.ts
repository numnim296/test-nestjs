import { ResetPasswordDto, UpdateUserDto } from './../../dto/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserDto } from 'src/dto/user.dto';
import { hash } from 'src/helpers/hash';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async getAllUser(req: FastifyRequest, res: FastifyReply) {
        try {
            let data = await this.prismaService.users.findMany({})
            return res.status(200).send(data)
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
            const password = hash(body.password)
            await this.prismaService.users.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: password.hash,
                    role_id: body.role_id,
                    created_at: new Date(),
                    salt: password.salt,
                },
            })
            return res.status(HttpStatus.OK).send({
                status: HttpStatus.OK,
                message: "create user profile success!"
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

    async updateUserProfile(body: UpdateUserDto, res: FastifyReply) {
        try {
            await this.prismaService.users.update({
                where: {
                    id: body.id,
                },
                data: {
                    name: body.name,
                    email: body.email,
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
                    // status: "inactive",
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


}
