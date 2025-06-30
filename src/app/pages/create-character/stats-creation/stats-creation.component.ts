import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Level } from 'src/app/interfaces/level';
import { RacesComplete } from 'src/app/interfaces/races';

@Component({
  selector: 'app-stats-creation',
  templateUrl: './stats-creation.component.html',
  styleUrls: ['./stats-creation.component.scss'],
  standalone: false
})
export class StatsCreationComponent  implements OnInit {
  @Input() level!: Level;
  @Input() races!: RacesComplete;

  @Output() statsComplete = new EventEmitter<void>();
  @Output() back = new EventEmitter<string>();

  public statsForm: FormGroup;

  public blockedStrength: boolean = false;
  public blockedDexterity: boolean = false;
  public blockedConstitution: boolean = false;
  public blockedIntelligence: boolean = false;
  public blockedWisdom: boolean = false;
  public blockedCharisma: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.statsForm = this.fb.group({
      strength: [0,[Validators.required, Validators.min(1), Validators.max(20)]],
      dexterity: [0,[Validators.required, Validators.min(1), Validators.max(20)]],
      constitution: [0,[Validators.required, Validators.min(1), Validators.max(20)]],
      intelligence: [0,[Validators.required, Validators.min(1), Validators.max(20)]],
      wisdom: [0,[Validators.required, Validators.min(1), Validators.max(20)]],
      charisma: [0,[Validators.required, Validators.min(1), Validators.max(20)]]
    });}

  ngOnInit() {

  }


  randomizeStat(key:string) {
   const rollStat = (): number => {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,

  ];
  rolls.sort((a, b) => b - a);
  return rolls[0] + rolls[1] + rolls[2];
};
    switch (key) {
      case 'strength':
        const  bonus = this.races.ability_bonuses.filter(bonus => bonus.ability_score.index === 'str');
        if(bonus.length > 0){
          const abilitybonus = bonus[0].bonus;
          this.statsForm.get('strength')?.setValue(rollStat() + abilitybonus);
        }else{
        this.statsForm.get('strength')?.setValue(rollStat());
        }
        this.blockedStrength = true;
        break;
      case 'dexterity':
        const dexterityBonus = this.races.ability_bonuses.filter(bonus => bonus.ability_score.index === 'dex');
        if(dexterityBonus.length > 0){
          const abilitybonus = dexterityBonus[0].bonus;
          this.statsForm.get('dexterity')?.setValue(rollStat() + abilitybonus);
        }else{
          this.statsForm.get('dexterity')?.setValue(rollStat());
        }
        this.blockedDexterity = true;
        break;
      case 'constitution':
        const constitutionBonus = this.races.ability_bonuses.filter(bonus => bonus.ability_score.index === 'con');
        if(constitutionBonus.length > 0){
          const abilitybonus = constitutionBonus[0].bonus;
          this.statsForm.get('constitution')?.setValue(rollStat() + abilitybonus);
        }else{
          this.statsForm.get('constitution')?.setValue(rollStat());
        }
        this.blockedConstitution = true;
        break;
      case 'intelligence':
        const intelligenceBonus = this.races.ability_bonuses.filter(bonus => bonus.ability_score.index === 'int');
        if(intelligenceBonus.length > 0){
          const abilitybonus = intelligenceBonus[0].bonus;
          this.statsForm.get('intelligence')?.setValue(rollStat() + abilitybonus);
        }else{
          this.statsForm.get('intelligence')?.setValue(rollStat());
        }
        this.blockedIntelligence = true;
        break;
      case 'wisdom':
        const wisdomBonus = this.races.ability_bonuses.filter(bonus => bonus.ability_score.index === 'wis');
        if(wisdomBonus.length > 0){
          const abilitybonus = wisdomBonus[0].bonus;
          this.statsForm.get('wisdom')?.setValue(rollStat() + abilitybonus);
        }else{
          this.statsForm.get('wisdom')?.setValue(rollStat());
        }
        this.blockedWisdom = true;
        break;
      case 'charisma':
        const charismaBonus = this.races.ability_bonuses.filter(bonus => bonus.ability_score.index === 'cha');
        if(charismaBonus.length > 0){
          const abilitybonus = charismaBonus[0].bonus;
          this.statsForm.get('charisma')?.setValue(rollStat() + abilitybonus);
        }else{
          this.statsForm.get('charisma')?.setValue(rollStat());
        }
        this.blockedCharisma = true;
        break;
    }
    console.log(this.statsForm.valid);
  }



  send(){
    sessionStorage.setItem('stats', JSON.stringify({ strength: this.statsForm.value.strength, dexterity: this.statsForm.value.dexterity, constitution: this.statsForm.value.constitution, intelligence: this.statsForm.value.intelligence, wisdom: this.statsForm.value.wisdom, charisma: this.statsForm.value.charisma }));
    console.log('Stats saved to sessionStorage');
    console.log('Stats:', sessionStorage.getItem('stats'));
    this.statsComplete.emit();
  }

  onClick() {
    this.back.emit('backStats');
  }
}
