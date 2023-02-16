import { CustomersService } from './../../services/customers/customers.service';
import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { AuthGuard } from '@nestjs/passport';


@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:pages/:size')
    getAllCustomer(@Param('pages') pages: string, @Param('size') size: string, @Res() res: FastifyReply) {
        console.log(pages, size)
        return this.customersService.getAllCustomer(pages, size, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createUserProfile(@Body() body: CreateUserDto, @Res() res: FastifyReply) {
        return this.customersService.addCustomer(body, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editUserProfile(@Body() body: UpdateUserDto, @Res() res: FastifyReply) {
        return this.customersService.updateCustomer(body, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    deleteUserProfile(@Param("id") id: string, @Res() res: FastifyReply) {
        return this.customersService.deleteCustomer(id, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search/:word/:pages/:size')
    searchData(@Param('word') word: string, @Param('pages') pages: string, @Param('size') size: string, @Res() res: FastifyReply) {
        return this.customersService.searchData(word, pages, size, res)
    }


}
