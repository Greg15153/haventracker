import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import CreateUserDto from './postmodels/createuser.dto'
import { JwtAuthGuard } from 'src/authz/jwt-auth.guard'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): string {
        return 'Test'
    }

    @Post()
    async create(@Body() createUserPostModel: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserPostModel)
    }
}
