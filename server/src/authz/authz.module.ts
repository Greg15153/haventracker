import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import authzConfig from './authz.config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [ConfigModule.forFeature(authzConfig), PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [JwtStrategy],
    exports: [PassportModule]
})
export class AuthzModule {}
