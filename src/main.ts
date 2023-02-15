import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as session from 'express-session';
// import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // app.use(
  //   session({
  //     secret: "smart-meter",
  //     resave: false,
  //     saveUninitializd: false,
  //     cookie: { maxAge: 3600000 }
  //   }
  //   )
  // )
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();


// import compression from '@fastify/compress'
// import helmet from '@fastify/helmet'
// import secureSession from '@fastify/secure-session'
// import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
// import { NestFactory } from '@nestjs/core'
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// import { v4 as UUIDv4 } from 'uuid'
// import * as packageJson from '../package.json'
// import { AppModule } from './modules/app.module'
// import { ConfigService, LoggerService } from './services'
// import fastifyCors from '@fastify/cors'
// import fastifyMultipart from '@fastify/multipart'

// function setupSwagger(app: INestApplication) {
//   const config = new DocumentBuilder()
//     .setTitle('Thai smile bus API Document')
//     .setVersion(packageJson.version)
//     .addBearerAuth()
//     .build()
//   const document = SwaggerModule.createDocument(app, config)
//   SwaggerModule.setup('swagger', app, document)
// }

// async function setupPlugins(app: NestFastifyApplication, configService: ConfigService) {
//   const cookieKey = configService.get<string[]>('cookie.key', []).map((key) => Buffer.from(key, 'hex'))
//   await app.register(helmet)
//   await app.register(compression)
//   await app.register(secureSession, {
//     key: cookieKey,
//     cookie: {
//       httpOnly: true,
//       secure: !configService.isDevelopment,
//       path: '/',
//     },
//   })
//   await app.register(fastifyCors, {
//     credentials: true,
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
//     origin: configService.get('application.frontend_url'),
//   })
//   await app.register(fastifyMultipart)
// }

// async function bootstrap() {
//   const logger = new Logger(bootstrap.name)
//   const app = await NestFactory.create<NestFastifyApplication>(
//     AppModule,
//     new FastifyAdapter({
//       genReqId: () => UUIDv4(),
//     }),
//     {
//       bufferLogs: true,
//     },
//   )
//   const configService = app.get(ConfigService)
//   const port = configService.get<number>('application.port')

//   app.useLogger(app.get(LoggerService))
//   app.useGlobalPipes(new ValidationPipe())

//   setupSwagger(app)
//   await setupPlugins(app, configService)
//   await app.listen(port, '0.0.0.0')

//   logger.log(JSON.stringify(process.env))
//   logger.log(`Application starting on port ${port}`)
// }

// bootstrap()
