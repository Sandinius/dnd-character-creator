import { AbilityBonuse } from "./ability-bonuse"
import { Language } from "./language"
import { StartingProficiency } from "./starting-proficiency"
import { Trait } from "./traits"

export interface Races {
  index: string
  name: string
}
export interface RacesComplete{
  index: string
  name: string
  speed: number
  ability_bonuses: AbilityBonuse[]
  size: string
  size_description: string
  starting_proficiencies: StartingProficiency[]
  languages: Language[]
  traits: Trait[]
}
