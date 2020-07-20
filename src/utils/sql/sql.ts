import { Sequelize } from 'sequelize'
import configuration, { validateApiConfiguration } from '../configuration/configuration'

validateApiConfiguration()

export const sequelize = new Sequelize(
    configuration.database.databaseName,
    configuration.database.username,
    configuration.database.password,
    {
        host: configuration.database.host,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                useUTC: true
            }
        }
    }
)

export async function healthCheck(): Promise<boolean> {
    try {
        await sequelize.authenticate()
        return true
    } catch (error) {
        console.error('Unable to connect to database', error)
        return false
    }
}
