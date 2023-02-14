import * as secureSession from '@fastify/secure-session'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { from, map, Observable, tap } from 'rxjs'
import { UserSession } from 'src/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'src/helpers/hash';
import { SESSION_KEY } from 'src/constants';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }

    login(body: LoginDto,session: secureSession.Session): Observable<UserSession> {
        return from(
            this.prismaService.users.findFirst({
                where: {
                    //username not email
                    email: body.username,
                    //   status: 'ACTIVE',
                },
            }),
        ).pipe(
            tap((user) => {
                console.log(user);

                console.log(body.password, user.password, user.salt)
                if (!user || !compare(body.password, user.password, user.salt)) {
                    console.log('jiji')
                    throw new UnauthorizedException()
                }
            }),
            map((user) => {
                delete user.password
                delete user.salt

                const newData = {
                    ...user,
                }

                // session.set(SESSION_KEY.USER, user)
                return user
            }),
        )
    }
}
