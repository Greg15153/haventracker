import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    OneToMany
} from 'typeorm'
import { AuthSub } from './authsub.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 50 })
    displayName: string

    @OneToMany(
        () => AuthSub,
        authSub => authSub.user
    )
    AuthSubs: AuthSub[]

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date

    @DeleteDateColumn()
    deleteDate: Date

    @VersionColumn()
    version: number
}
