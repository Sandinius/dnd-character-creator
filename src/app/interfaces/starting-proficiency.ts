import { References } from "./references"

export interface StartingProficiency {
  index: string
  name: string
  url: string
}

export interface StartingProficiencyFull {
  index: string
  name: string
  reference: References
}
