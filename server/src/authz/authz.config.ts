import { registerAs } from '@nestjs/config'

export default registerAs('authz', () => ({
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE
}))
