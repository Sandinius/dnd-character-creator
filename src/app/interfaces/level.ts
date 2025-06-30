import { Feature } from "./feature"
import { Spellcasting } from "./spellcasting"

export interface Level {
  level: number
  ability_score_bonuses: number
  prof_bonus: number
  features: Feature[]
  spellcasting: Spellcasting
  index: string
  url: string
  updated_at: string
}
