import { sequelize } from '../../utils/sql/sql'
import { Optional, Model, DataTypes } from 'sequelize'

export interface UserAttributes {
    id: number
    displayName: string
    authSub: string
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number
    public displayName!: string
    public authSub!: string

    // timestamps
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        displayName: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        authSub: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            unique: true
        }
    },
    { tableName: 'users', paranoid: true, sequelize }
)

User.sync({ alter: true })
