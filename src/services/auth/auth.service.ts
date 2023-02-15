import * as secureSession from '@fastify/secure-session'
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { from, map, Observable, tap } from 'rxjs'
import { UserSession } from 'src/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'src/helpers/hash';
import { SESSION_KEY } from 'src/constants';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Tokens } from 'src/types';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,) { }

    // login(body: LoginDto, session: secureSession.Session): Observable<UserSession> {
    //     return from(
    //         this.prismaService.users.findFirst({
    //             where: {
    //                 //username not email
    //                 email: body.username,
    //                 //   status: 'ACTIVE',
    //             },
    //         }),
    //     ).pipe(
    //         tap((user) => {
    //             console.log(user);

    //             console.log(body.password, user.password, user.salt)
    //             if (!user || !compare(body.password, user.password, user.salt)) {
    //                 console.log('jijitttt')
    //                 throw new UnauthorizedException()
    //             }
    //         }),
    //         map((user) => {
    //             delete user.password
    //             delete user.salt

    //             const newData = {
    //                 ...user,
    //             }

    //             session.set(SESSION_KEY.USER, user)
    //             return user
    //         }),
    //     )
    // }

    async login(dto: LoginDto) {
        const user = await this.prismaService.users.findFirst({
            where: {
                email: dto.email,
                status: 1,
            },
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
            email: user.email
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

}
