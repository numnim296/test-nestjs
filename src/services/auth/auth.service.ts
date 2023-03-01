import { resetDto } from './../../dto/auth.dto';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'src/helpers/hash';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from 'src/types';
import { FastifyReply } from 'fastify';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,) { }


    async login(dto: LoginDto) {
        const user = await this.prismaService.users.findFirst({
            where: {
                email: dto.email,
                status: 1,
            },
            select: {
                id: true,
                email: true,
                role: true,
                password: true,
                salt: true,
                name: true,
            }
        });

        if (!user) throw new ForbiddenException('Access Denied');

        if (!user || !compare(dto.password, user.password, user.salt)) {
            throw new UnauthorizedException()
        }
        const tokens = await this.getTokens(user.id, user.email);
        // await this.updateRtHash(user.id, tokens.refresh_token);
        const data = {
            access_token: tokens.access_token,
            id: user.id,
            email: user.email,
            role: user.role,
            name:user.name
        }

        return data;
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('AT_SECRET'),
                expiresIn: '1d',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.config.get<string>('RT_SECRET'),
                expiresIn: '7d',
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };
    }

    async Reset(dto: resetDto,res:FastifyReply) {
        // send link and token to email

        //
        return  res.send(200)
    }


}
