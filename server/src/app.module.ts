import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/entities/user.entity'
import { AuthSub } from './users/entities/authsub.entity'
import { AuthzModule } from './authz/authz.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            // TODO: Get .env working in both apps at this repository root OR application folder root
            // Base off env variable and define in VS Code launch ?
            envFilePath: ['.env.local']
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
                    synchronize: true
                }
            }
        }),
        AuthzModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
