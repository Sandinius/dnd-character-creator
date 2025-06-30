import { Component,OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Classes } from 'src/app/interfaces/classes';

@Component({
  selector: 'app-proficiencies-selection',
  templateUrl: './proficiencies-selection.component.html',
  styleUrls: ['./proficiencies-selection.component.scss'],
  standalone: false
})
export class ProficienciesSelectionComponent implements  OnInit{
  @Input() classes!: Classes;
  @Output() back = new EventEmitter<string>();
  @Output() proficienciesComplete = new EventEmitter<void>();

  public proficienciesForm: FormGroup;

  public availableProficiencies: { id: string; name: string; ability: string; value: number; blocked: boolean }[] = [
  { id: 'skill-acrobatics', name: 'Acrobatics', ability: 'Dexterity', value: 0, blocked: true },
  { id: 'skill-animal-handling', name: 'Animal Handling', ability: 'Wisdom', value: 0, blocked: true },
  { id: 'skill-arcana', name: 'Arcana', ability: 'Intelligence', value: 0, blocked: true },
  { id: 'skill-athletics', name: 'Athletics', ability: 'Strength', value: 0, blocked: true },
  { id: 'skill-deception', name: 'Deception', ability: 'Charisma', value: 0, blocked: true },
  { id: 'skill-history', name: 'History', ability: 'Intelligence', value: 0, blocked: true },
  { id: 'skill-insight', name: 'Insight', ability: 'Wisdom', value: 0, blocked: true },
  { id: 'skill-intimidation', name: 'Intimidation', ability: 'Charisma', value: 0, blocked: true },
  { id: 'skill-investigation', name: 'Investigation', ability: 'Intelligence', value: 0, blocked: true },
  { id: 'skill-medicine', name: 'Medicine', ability: 'Wisdom', value: 0, blocked: true },
  { id: 'skill-nature', name: 'Nature', ability: 'Intelligence', value: 0, blocked: true },
  { id: 'skill-perception', name: 'Perception', ability: 'Wisdom', value: 0, blocked: true },
  { id: 'skill-performance', name: 'Performance', ability: 'Charisma', value: 0, blocked: true },
  { id: 'skill-persuasion', name: 'Persuasion', ability: 'Charisma', value: 0, blocked: true },
  { id: 'skill-religion', name: 'Religion', ability: 'Intelligence', value: 0, blocked: true },
  { id: 'skill-sleight-of-hand', name: 'Sleight of Hand', ability: 'Dexterity', value: 0, blocked: true },
  { id: 'skill-stealth', name: 'Stealth', ability: 'Dexterity', value: 0, blocked: true },
  { id: 'skill-survival', name: 'Survival', ability: 'Wisdom', value: 0, blocked: true }
];
selectedProfieciencies: Array<string>=[]
  abilitys:object = {};

  public values:number = 0;

  constructor(private fb: FormBuilder) {
    this.proficienciesForm = this.fb.group({
      proficiencies: this.fb.array([])
    });
  }

  ngOnInit() {
      const characterData = JSON.parse(sessionStorage.getItem('stats') || '{}');
      this.updateProficienciesWithModifiers(characterData);
      this.blockSkill();
    }
    blockSkill(){
      console.log(this.classes)
    this.classes.proficiency_choices[0].from.options.forEach(skil=>{
      this.availableProficiencies.forEach(ab =>{
        console.log(skil.item.index)
        if(skil.item.index == ab.id){
          ab.blocked = false;
        }
      })
    })
    console.log(this.availableProficiencies)
    }
  calculateModifiers(scores: { [key: string]: number }): { [key: string]: number } {
    const modifiers: { [key: string]: number } = {};
      for (const [ability, score] of Object.entries(scores)) {
          modifiers[ability] = Math.floor((score - 10) / 2);
      }
    return modifiers;
  }

updateProficienciesWithModifiers(characterData: { [key: string]: number }) {
  const modifiers = this.calculateModifiers(characterData);
  this.availableProficiencies = this.availableProficiencies.map(prof => {
    const abilityKey = prof.ability.toLowerCase();
    const modifier = modifiers[abilityKey] ?? 0;
    return {
      ...prof,
      value: modifier
    };
  });
}

  onCheckboxChange(event: any) {

    if (this.selectedProfieciencies.length <= this.classes.proficiency_choices[0].choose){
    if (event.target.checked) {
      this.selectedProfieciencies.push(event.target.value);
    }
    }else{

    }
    console.log(this.selectedProfieciencies.length)

  }

  goBack() {
    this.back.emit('backProficiencies');
  }

  submit() {
    this.proficienciesComplete.emit();
    sessionStorage.setItem('proficiencies', JSON.stringify(this.proficienciesForm.value));
  }
}
