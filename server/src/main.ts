import * as helmet from 'fastify-helmet'

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

    app.register(helmet)
    app.enableCors()
    await app.listen(5000)
}

bootstrap()
