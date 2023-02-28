import { PaymentService } from './../../services/payment/payment.service';
import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply } from 'fastify';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    getAllPaymentTransaction(@Query() params: any, @Res() res: FastifyReply) {
        return this.paymentService.getAllPaymentTransaction(params.pages, params.size, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/search')
    searchPaymentTransaction(@Query() params: any, @Res() res: FastifyReply) {
        return this.paymentService.searchPayment(params.word, params.type, params.pages, params.size, res)
    }

}
