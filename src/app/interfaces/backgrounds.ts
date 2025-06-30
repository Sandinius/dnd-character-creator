import { Feature } from "./feature"
import { LanguageOptions } from "./language-options"
import { StartingEquipment } from "./starting-equipment"
import { StartingEquipmentOption } from "./starting-equipment-option"
import { StartingProficiency } from "./starting-proficiency"

export interface BackgroundsFull {
  index: string
  name: string
  starting_proficiencies: StartingProficiency[]
  language_options: LanguageOptions
  starting_equipment: StartingEquipment[]
  starting_equipment_options: StartingEquipmentOption[]
  feature: Feature
}

