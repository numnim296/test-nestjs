import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { get } from 'lodash'
import { controllers } from '../controllers'
import { FilterProvider, ServiceProvider } from '../providers'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'

import { JwtStrategy } from '../jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // load: [() => require(`../config/config.${get(process, 'env.NODE_ENV', 'development')}`).default],
    }),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [...controllers],
  providers: [...FilterProvider, ...ServiceProvider,JwtStrategy],
})
export class AppModule { }
