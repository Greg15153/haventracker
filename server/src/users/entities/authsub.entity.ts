import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class AuthSub {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sub: string

    @ManyToOne(
        () => User,
        user => user.AuthSubs
    )
    user: User

    @CreateDateColumn()
    createDate: Date
}
