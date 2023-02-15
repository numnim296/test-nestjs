import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { UserService } from './../../services/user/user.service';
import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAllUserProfile(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        return this.userService.getAllUser(req, res)
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
    @Delete('delete/:id')
    deleteUserProfile(@Param("id") id: string, @Res() res: FastifyReply) {
        return this.userService.deleteUserProfile(id, res)
    }



}
