import { RoleService } from './../services/role/role.service';
import { Provider } from '@nestjs/common'
import { JwtStrategy } from 'src/jwt.strategy'
import {

  PrismaService,
  UserService,
  AuthService
} from '../services'


export const ServiceProvider: Provider[] = [
  PrismaService,
  UserService,
  AuthService,
  JwtStrategy,
  RoleService
]
