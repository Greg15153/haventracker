import { Controller, Get } from '@nestjs/common'
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    HealthIndicatorResult,
    TypeOrmHealthIndicator
} from '@nestjs/terminus'

@Controller('health')
export class HealthController {
    constructor(private health: HealthCheckService, private typeOrm: TypeOrmHealthIndicator) {}

    @Get()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        return this.health.check([(): Promise<HealthIndicatorResult> => this.typeOrm.pingCheck('database')])
    }
}
