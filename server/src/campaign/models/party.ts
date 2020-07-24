import { Character } from './character'

export interface Party {
    name: string
    location: string // TODO: Relate this to Scenario # or Gloomhaven
    members: Character[]
    notes: string
    reputation: number
    shopPriceModifier: number // TODO: Figure out if this is automateable -- However, do we still want to give full control for the user to edit
    achievements: string // TODO: Change this to relate to actual game achievements
}
