import { CreateCustomersDto } from './../../dto/customers.dto';
import { CustomersService } from './../../services/customers/customers.service';
import { UpdateUserDto } from './../../dto/user.dto';
import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserEmail } from 'src/decorators';


@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    getAllCustomer(@Query() params: any, @Res() res: FastifyReply) {
        console.log(params.pages, params.size)
        return this.customersService.getAllCustomer(params.pages, params.size, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createCustomer(@Body() body: CreateCustomersDto, @GetCurrentUserEmail() userEmail: string, @Res() res: FastifyReply) {
        return this.customersService.addCustomer(body, userEmail, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editCustomer(@Body() body: UpdateUserDto, @GetCurrentUserEmail() userEmail: string, @Res() res: FastifyReply) {
        return this.customersService.updateCustomer(body, userEmail, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    deleteCustomer(@Query() params: any, @GetCurrentUserEmail() userEmail: string, @Res() res: FastifyReply) {
        return this.customersService.deleteCustomer(params.id, userEmail, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    searchData(@Query() params: any, @Res() res: FastifyReply) {
        return this.customersService.searchData(params.type, params.word, params.pages, params.size, res)
    }


}
