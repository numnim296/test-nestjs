import { CreateUserDto, UpdateUserDto } from './../../dto/user.dto';
import { UserService } from './../../services/user/user.service';
import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserEmail } from 'src/decorators';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('')
    getAllUserProfile(@Query() params: any, @Res() res: FastifyReply) {
        return this.userService.getAllUser(params.pages, params.size, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createUserProfile(@Body() body: CreateUserDto, @GetCurrentUserEmail() userEmail: string, @Res() res: FastifyReply) {
        return this.userService.addUserProfile(body, userEmail, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editUserProfile(@Body() body: UpdateUserDto, @GetCurrentUserEmail() userEmail: string, @Res() res: FastifyReply) {
        return this.userService.updateUserProfile(body, userEmail, res)
    }


    @UseGuards(AuthGuard('jwt'))
    @Delete('delete')
    deleteUserProfile(@Query() params: any, @Res() res: FastifyReply) {
        return this.userService.deleteUserProfile(params.id, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    searchData(@Query() params: any, @Res() res: FastifyReply) {
        return this.userService.searchData(params.type, params.word, params.pages, params.size, res)
    }


}
