import { Injectable, Scope, Global, Module } from '@nestjs/common'
import { Connection, EntityManager, ObjectType, EntitySchema, Repository, getRepository } from 'typeorm'
import { RepositoryFactory } from 'typeorm/repository/RepositoryFactory'

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork {
    private transactionManager: EntityManager | null

    constructor(private connection: Connection) {}

    getTransactionManager(): EntityManager | null {
        return this.transactionManager
    }

    getConnection(): Connection {
        return this.connection
    }

    async withTransaction<T>(work: () => T): Promise<T> {
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.startTransaction()
        this.transactionManager = queryRunner.manager
        try {
            const result = await work()
            await queryRunner.commitTransaction()
            return result
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
            this.transactionManager = null
        }
    }
}

@Injectable({ scope: Scope.REQUEST })
export class TransactionalRepository {
    constructor(private uow: UnitOfWork) {}
    /**
     * Gets a repository bound to the current transaction manager
     * or defaults to the current connection's call to getRepository().
     */
    getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Repository<Entity> {
        const transactionManager = this.uow.getTransactionManager()
        if (transactionManager) {
            const connection = this.uow.getConnection()
            const metadata = connection.getMetadata(target)
            return new RepositoryFactory().create(transactionManager, metadata)
        }
        return getRepository(target)
    }
}

@Global()
@Module({
    providers: [UnitOfWork, TransactionalRepository],
    exports: [UnitOfWork, TransactionalRepository]
})
export class UnitOfWorkModule {}
