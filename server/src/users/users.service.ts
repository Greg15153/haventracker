import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import CreateUserPostModel from './postmodels/create.postmodel'

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

    async create(createUserPostModel: CreateUserPostModel): Promise<User> {
        const user = await this.usersRepository.create({ ...createUserPostModel })
        await this.usersRepository.save(user)
        return user
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id)
    }
}
