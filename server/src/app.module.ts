import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi' // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/46241 -- Joi moving libraries awaiting Typescript changes

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthzModule } from './authz/authz.module'
import { EventsModule } from './events/events.module'
import { HealthController } from './health/health.controller'
import { AuthSub } from './users/entities/authsub.entity'
import { User } from './users/entities/user.entity'
import { UsersModule } from './users/users.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            // TODO: Get .env working in both apps at this repository root OR application folder root
            // Base off env variable and define in VS Code launch ?
            envFilePath: ['.env.local'],
            validationSchema: Joi.object({
                AUTH0_DOMAIN: Joi.string()
                    .uri()
                    .trim()
                    .replace(/\/$/, '')
                    .required(),
                AUTH0_AUDIENCE: Joi.string()
                    .uri()
                    .trim()
                    .replace(/\/$/, '')
                    .required(),
                DATABASE_NAME: Joi.string()
                    .trim()
                    .required(),
                DATABASE_HOST: Joi.string()
                    .trim()
                    .uri()
                    .allow('localhost')
                    .required(),
                DATABASE_PORT: Joi.number()
                    .port()
                    .default(1433),
                DATABASE_USERNAME: Joi.string().required(),
                DATABASE_PASSWORD: Joi.string().required()
            })
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'mssql',
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get<number>('DATABASE_PORT', 1433),
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    // TODO: figure out why autoLoad isn't working
                    entities: [User, AuthSub],
                    synchronize: true,
                    options: {
                        enableArithAbort: true
                    }
                }
            }
        }),
        TerminusModule,
        AuthzModule,
        EventsModule,
        UsersModule
    ],
    controllers: [AppController, HealthController],
    providers: [AppService]
})
export class AppModule {}
