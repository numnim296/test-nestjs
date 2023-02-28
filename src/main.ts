import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import compression from '@fastify/compress'
import helmet from '@fastify/helmet'
import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import { v4 as UUIDv4 } from 'uuid'

async function setupPlugins(app: NestFastifyApplication) {
  await app.register(helmet)
  await app.register(compression)
  await app.register(fastifyCors, {
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    origin: true,
    allowedHeaders: [
      'Origin', 
      'X-Requested-With', 
      'Accept', 
      'Content-Type', 
      'Authorization'
  ],
    // origin: configService.get('application.frontend_url'),
  })
  await app.register(fastifyMultipart)
}


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      genReqId: () => UUIDv4(),
    }),
    {
      bufferLogs: true,
    },
  )

  // const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");
  app.useGlobalPipes(new ValidationPipe());

  await setupPlugins(app)
  await app.listen(3000);
}
bootstrap();

