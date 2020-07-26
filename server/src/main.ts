import * as helmet from 'fastify-helmet'

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'

//import { RedisIoAdapter } from './events/adapters/redis-io.adapter'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

    //app.use(new RedisIoAdapter(app))

    app.register(helmet)
    app.enableCors({
        origin: '*:*',
        credentials: true
    })
    await app.listen(5000)
}

bootstrap()
