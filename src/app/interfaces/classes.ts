import { Proficiency } from "./proficiency"
import { ProficiencyChoice } from "./proficiency-choice"
import { SavingThrow } from "./saving-throw"
import { StartingEquipment } from "./starting-equipment"
import { StartingEquipmentOption } from "./starting-equipment-option"
import { Subclass } from "./subclass"

export interface Classes {
  index: string
  name: string
  hit_die: number
  proficiency_choices: ProficiencyChoice[]
  proficiencies: Proficiency[]
  saving_throws: SavingThrow[]
  starting_equipment: StartingEquipment[]
  starting_equipment_options: StartingEquipmentOption[]
  class_levels: string
  subclasses: Subclass[]
  url: string
  updated_at: string
}
