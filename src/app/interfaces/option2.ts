import { Choice } from "./choice"
import { Of } from "./of"

export interface Option2 {
  option_type: string
  count?: number
  of?: Of
  choice?: Choice
}
