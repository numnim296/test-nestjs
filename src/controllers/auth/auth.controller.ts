
// import { ResetPasswordDto } from './../../dto/user.dto';
import { Body, Controller, Post, Res, Session } from '@nestjs/common';
// import * as secureSession from '@fastify/secure-session'
import { LoginDto,resetDto } from 'src/dto'
import { AuthService } from 'src/services'
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() dto: LoginDto): Promise<any> {
        return this.authService.login(dto);
    }

    @Post('reset')
    resetPassword(@Body() dto: resetDto, @Res() res: FastifyReply) {
        return this.authService.Reset(dto, res);
    }

}
