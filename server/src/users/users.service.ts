import CreateUserDto from './dtos/createuser.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id)
    }

    async create(createUserPostModel: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create({ ...createUserPostModel })
        await this.usersRepository.save(user)
        return user
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id)
    }
}
