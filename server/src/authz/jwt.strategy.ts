import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

import authzConfig from './authz.config'

interface Payload {
    iss: string
    sub: string
    aud: string[] | string
    iat: Date
    exp: Date
    azp: string
    gty?: string
    scope?: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(authzConfig.KEY)
        config: ConfigType<typeof authzConfig>
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config.domain}/.well-known/jwks.json`
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: config.audience,
            issuer: `${config.domain}/`,
            algorithms: ['RS256']
        })
    }

    validate(payload: Payload): Payload {
        console.log(payload)
        return payload
    }
}
