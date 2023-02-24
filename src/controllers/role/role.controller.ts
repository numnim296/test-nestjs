import { UserRoleDto, UpdateUserRoleDto } from './../../dto/role.dto';
import { RoleService } from './../../services/role/role.service';
import { Body, Controller, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { AuthGuard } from '@nestjs/passport';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }


    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    searchData(@Query() params: any, @Res() res: FastifyReply) {
        return this.roleService.searchUserRole(params.word, params.pages, params.size, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    getAllUserRole(@Query() params: any, @Res() res: FastifyReply) {
        return this.roleService.getAllUserRole(params.pages, params.size, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createUserProfile(@Body() body: UserRoleDto, @Res() res: FastifyReply) {
        return this.roleService.addUserRole(body, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('edit')
    editUserProfile(@Body() body: UpdateUserRoleDto, @Res() res: FastifyReply) {
        return this.roleService.updateUserRole(body, res)
    }


}
