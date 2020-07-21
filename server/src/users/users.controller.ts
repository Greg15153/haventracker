import { Controller, Get, Post, Body } from '@nestjs/common'
import CreateUserPostModel from './postmodels/create.postmodel'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'

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
