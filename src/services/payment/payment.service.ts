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
                take: take,
                skip: skip,
            })

            let count = await this.prismaService.payments.count()
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

    async searchPayment(word: string, type: string, pages: string, size: string, res: FastifyReply) {
        try {
            let take = Number(size)
            let skip = (Number(pages) - 1) * take
            let where = {}
            if (type == 'txid') {
                where = {
                    txid: {
                        contains: word
                    }
                }
            } else if (type == 'device_id') {
                where = {
                    device_id: {
                        contains: parseInt(word)
                    }
                }
            } else if (type == 'cust_id') {
                where = {
                    cust_id: {
                        contains: parseInt(word)
                    }
                }
            } else if (type == 'ref_no') {
                where = {
                    ref_no: {
                        contains: word
                    }
                }
            }
            let data = await this.prismaService.payments.findMany({
                where,
                take: take,
                skip: skip,
            })
            let count = await this.prismaService.payments.count({ where })

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
}
