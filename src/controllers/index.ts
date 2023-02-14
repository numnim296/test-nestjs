import { AuthController } from './auth/auth.controller';
import { Type } from '@nestjs/common'
import { UserController } from './user/user.controller';

export const controllers: Type[] = [
    UserController,
    AuthController,
]
