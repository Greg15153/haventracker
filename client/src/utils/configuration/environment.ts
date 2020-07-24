export enum NodeEnvironment {
    Development,
    Staging,
    Production
}

export default interface EnvironmentConfiguration {
    nodeEnvironment: NodeEnvironment
}
