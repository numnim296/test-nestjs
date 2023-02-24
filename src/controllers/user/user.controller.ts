import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { UserService } from './../../services/user/user.service';
import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    // @UseGuards(AuthGuard('jwt'))
    // @Get('/:pages/:size')
    // getAllUserProfile(@Param('pages') pages: string, @Param('size') size: string, @Res() res: FastifyReply) {
    //     console.log(pages, size)
    //     return this.userService.getAllUser(pages, size, res)
    // }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    getAllUserProfile(@Query() params: any, @Res() res: FastifyReply) {
        console.log(params.pages, params.size)
        return this.userService.getAllUser(params.pages, params.size, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createUserProfile(@Body() body: CreateUserDto, @Res() res: FastifyReply) {
        return this.userService.addUserProfile(body, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editUserProfile(@Body() body: UpdateUserDto, @Res() res: FastifyReply) {
        return this.userService.updateUserProfile(body, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    deleteUserProfile(@Query() params: any, @Res() res: FastifyReply) {
        return this.userService.deleteUserProfile(params.id, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    searchData(@Query() params: any, @Res() res: FastifyReply) {
        return this.userService.searchData(params.word, params.pages, params.size, res)
    }


}
