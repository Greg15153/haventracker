import { ConfigModule } from '@nestjs/config'
import { JwtStrategy } from './jwt.strategy'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import authzConfig from './authz.config'

@Module({
    imports: [ConfigModule.forFeature(authzConfig), PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [JwtStrategy],
    exports: [PassportModule]
})
export class AuthzModule {}
