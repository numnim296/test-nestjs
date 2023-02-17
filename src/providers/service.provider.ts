import { Provider } from '@nestjs/common'
import { MailDto } from 'src/dto'
import { JwtStrategy } from 'src/jwt.strategy'
import {

  PrismaService,
  UserService,
  AuthService,
  CustomersService,
  MailService,
  PaymentService,
  DeviceService,
  RoleService
} from '../services'


export const ServiceProvider: Provider[] = [
  PrismaService,
  UserService,
  AuthService,
  JwtStrategy,
  RoleService,
  CustomersService,
  DeviceService,
  PaymentService,
  MailService,
  MailDto
]
