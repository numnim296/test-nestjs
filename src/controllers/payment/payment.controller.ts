import { PaymentService } from './../../services/payment/payment.service';
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply } from 'fastify';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:pages/:size')
    getAllUserProfile(@Param('pages') pages: string, @Param('size') size: string, @Res() res: FastifyReply) {
        console.log(pages, size)
        return this.paymentService.getAllPaymentTransaction(pages, size, res)
    }

}
