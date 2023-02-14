import { Provider } from '@nestjs/common'
import {

  PrismaService,
  UserService,
  AuthService
} from '../services'

export const ServiceProvider: Provider[] = [
  PrismaService,
  UserService,
  AuthService
]
