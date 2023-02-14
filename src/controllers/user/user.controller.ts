import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { UserService } from './../../services/user/user.service';
import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify'


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    //@Auth || Guard
    @Get()
    getAllUserProfile(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        return this.userService.getAllUser(req, res)
    }

    @Post('create')
    createUserProfile(@Body() body: CreateUserDto, @Res() res: FastifyReply) {
        return this.userService.addUserProfile(body, res)
    }

    @Post('edit')
    editUserProfile(@Body() body: UpdateUserDto, @Res() res: FastifyReply) {
        return this.userService.updateUserProfile(body, res)
    }


    @Delete('delete/:id')
    deleteUserProfile(@Param("id") id: string, @Res() res: FastifyReply) {
        return this.userService.deleteUserProfile(id, res)
    }



}
