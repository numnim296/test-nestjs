import { Body, Controller, Post, Session } from '@nestjs/common';
// import * as secureSession from '@fastify/secure-session'
import { LoginDto } from 'src/dto'
import { AuthService } from 'src/services'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('login')
    login(@Body() dto: LoginDto): Promise<any> {
        return this.authService.login(dto);
      }
    
}
