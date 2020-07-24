export interface Scenario {
    number: number
    rewards: Reward[]
    requirements: Requirement[]
}

export type GlobalAchievement = string
export type PartyAchievement = string
export type AchievementIncomplete = PartyAchievement | GlobalAchievement
export type Gold = number
export type Experience = number
export type Prosperity = number

export type Reward = Scenario | Gold | Experience | Prosperity
export type Requirement = GlobalAchievement | PartyAchievement

const FirstSteps: PartyAchievement = 'First Steps'
const JekserahsPlans: PartyAchievement = "Jekserah's Plans"
const CityRuleMilitaristic: GlobalAchievement = 'City Rule: Militaristic'
const TheMerchantFlees: GlobalAchievement = 'The Merchant Flees'

export const RuinousCrypt = {
    number: 5,
    rewards: [],
    requirements: []
}

export const DecayingCrypt = {
    number: 6,
    rewards: [],
    requirements: []
}

export const GloomHavenWarehouse = {
    number: 8,
    rewards: [],
    requirements: []
}

export const DiamondMine = {
    number: 9,
    rewards: [],
    requirements: []
}

export const CryptoftheDamned = {
    number: 4,
    rewards: [],
    requirements: [RuinousCrypt, DecayingCrypt]
}

export const InoxEncampment = {
    number: 3,
    rewards: [15 as Gold, 1 as Prosperity, JekserahsPlans, DiamondMine, GloomHavenWarehouse],
    requirements: [TheMerchantFlees as AchievementIncomplete]
}

export const BarrowLair = {
    number: 2,
    rewards: [10 as Gold, 1 as Prosperity],
    requirements: [FirstSteps]
}

export const BlackBarrow = {
    number: 1,
    rewards: [BarrowLair, FirstSteps, CityRuleMilitaristic],
    requirements: []
}
