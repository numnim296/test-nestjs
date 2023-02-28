import { CreateCustomersDto } from './../../dto/customers.dto';
import { CustomersService } from './../../services/customers/customers.service';
import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { AuthGuard } from '@nestjs/passport';


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
    createCustomer(@Body() body: CreateCustomersDto, @Res() res: FastifyReply) {
        return this.customersService.addCustomer(body, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editCustomer(@Body() body: UpdateUserDto, @Res() res: FastifyReply) {
        return this.customersService.updateCustomer(body, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    deleteCustomer(@Query() params: any, @Res() res: FastifyReply) {
        return this.customersService.deleteCustomer(params.id, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    searchData(@Query() params: any, @Res() res: FastifyReply) {
        return this.customersService.searchData(params.type, params.word, params.pages, params.size, res)
    }


}
