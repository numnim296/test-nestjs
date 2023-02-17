import { UserRoleDto, UpdateUserRoleDto } from './../../dto/role.dto';
import { RoleService } from './../../services/role/role.service';
import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify'
import { AuthGuard } from '@nestjs/passport';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }


    @UseGuards(AuthGuard('jwt'))
    @Get('search/:word/:pages/:size')
    searchData(@Param('word') word: string, @Param('pages') pages: string, @Param('size') size: string, @Res() res: FastifyReply) {
        return this.roleService.searchUserRole(word, pages, size, res)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('all/:pages/:size')
    getAllUserRole(@Param('pages') pages: string, @Param('size') size: string, @Res() res: FastifyReply) {
        return this.roleService.getAllUserRole(pages, size, res)
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
