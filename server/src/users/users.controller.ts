import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import CreateUserPostModel from './postmodels/create.postmodel'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { JwtAuthGuard } from 'src/authz/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): string {
        return 'Test'
    }

    @Post()
    async create(@Body() createUserPostModel: CreateUserPostModel): Promise<User> {
        return await this.usersService.create(createUserPostModel)
    }
}
