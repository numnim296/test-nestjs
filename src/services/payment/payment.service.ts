import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
    constructor(private prismaService: PrismaService) { }

    async getAllPaymentTransaction(pages: string, size: string, res: FastifyReply) {

        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let data = await this.prismaService.payments.findMany({
                // select: {
                //     id: true,
                // email: true,
                // name: true,
                // mobile: true,
                // created_at: true,
                // status: true,
                // role_id: true,
                // },
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
