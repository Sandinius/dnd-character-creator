import { Component,OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BackgroundsFull } from 'src/app/interfaces/backgrounds';
import { Classes } from 'src/app/interfaces/classes';
import { Level } from 'src/app/interfaces/level';
import { RacesComplete } from 'src/app/interfaces/races';

@Component({
  selector: 'app-proficiencies-selection',
  templateUrl: './proficiencies-selection.component.html',
  styleUrls: ['./proficiencies-selection.component.scss'],
  standalone: false
})
export class ProficienciesSelectionComponent implements  OnInit{
  @Input() classes!: Classes;
  @Input() levels!: Level;
  @Input() background!: BackgroundsFull;
  @Input() races!: RacesComplete;
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
public selectedProfieciencies: Array<string>=[]
public abilitys:object = {};
public values:number = 0;
public maxChose!:number;
public defaultSkills: Array<string> =[];
  constructor(private fb: FormBuilder) {
    this.proficienciesForm = this.fb.group({
      proficiencies: this.fb.array([])
    });
  }

  ngOnInit() {
      this.maxChose= this.classes.proficiency_choices[0].choose;
      const characterData = JSON.parse(sessionStorage.getItem('stats') || '{}');
      this.updateProficienciesWithModifiers(characterData);
      this.addBackgroundSkills(this.background)
      this.addRacesSkills(this.races)
      this.blockSkill();

    }

    addBackgroundSkills(background: BackgroundsFull){
      background.starting_proficiencies.forEach( p =>{
        this.defaultSkills.push(p.index)
        this.availableProficiencies.forEach(pro => {
          if (pro.id === p.index) {
              pro.value = pro.value + this.levels.prof_bonus;
              console.log(`Asignado bonus ${this.levels.prof_bonus} a ${p.name}`);
           }
        });
      })
    }
    addRacesSkills(races: RacesComplete){
      races.starting_proficiencies.forEach( p =>{
        if(!this.defaultSkills.includes(p.index)){
          this.defaultSkills.push(p.index)
          this.availableProficiencies.forEach(pro => {
            if (pro.id === p.index) {
              pro.value = pro.value + this.levels.prof_bonus;
              console.log(`Asignado bonus ${this.levels.prof_bonus} a ${p.name}`);
            }
          });
        }
      })
    }
    blockSkill(){
      console.log(this.classes)
      console.log(this.defaultSkills)
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
  const value = event.target.value;
  const checked = event.target.checked;

  if (checked) {
    if (this.selectedProfieciencies.length < this.classes.proficiency_choices[0].choose) {
      this.selectedProfieciencies.push(value);

this.availableProficiencies.forEach(p => {
    if (p.id === value) {
      p.value = p.value + this.levels.prof_bonus;
      console.log(`Asignado bonus ${this.levels.prof_bonus} a ${p.name}`);
    }
  });
      this.maxChose--;
    } else {
      event.target.checked = false;
      console.log("Ya alcanzaste el máximo de habilidades seleccionables.");
    }
  } else {
    this.availableProficiencies.forEach(p => {
    if (p.id === value) {
      p.value = p.value - this.levels.prof_bonus;
      console.log(`Sacando el bonus ${this.levels.prof_bonus} a ${p.name}`);
    }
  });
    this.selectedProfieciencies = this.selectedProfieciencies.filter(p => p !== value);
    this.maxChose++;
  }
  if(this.selectedProfieciencies.length == this.classes.proficiency_choices[0].choose){
    this.availableProficiencies.forEach(p => {
        if (!this.selectedProfieciencies.includes(p.id)) {
          p.blocked = this.selectedProfieciencies.length >= this.classes.proficiency_choices[0].choose;
        }
    });
  }
  else{
    this.blockSkill();
  }


  console.log("Selección actual:", this.selectedProfieciencies);
}

  goBack() {
    this.back.emit('backProficiencies');
  }

  submit() {
    const finalSkills = [...this.defaultSkills, ...this.selectedProfieciencies];
    sessionStorage.setItem('proficiencies', JSON.stringify(finalSkills));
    const skills = sessionStorage.getItem('proficiencies')
    console.log(skills)
    this.proficienciesComplete.emit();
  }
}
