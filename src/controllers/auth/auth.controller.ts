import { Body, Controller, Post, Res } from '@nestjs/common';
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
