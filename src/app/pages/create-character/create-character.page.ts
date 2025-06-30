import { Component, OnInit } from '@angular/core';
import { CharacterData } from 'src/app/interfaces/character-data';
import { Classes } from 'src/app/interfaces/classes';
import { Level } from 'src/app/interfaces/level';
import { RacesComplete } from 'src/app/interfaces/races';
import { Results } from 'src/app/interfaces/results';
import { CharacterCreationService } from 'src/app/service/character-creation.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.page.html',
  styleUrls: ['./create-character.page.scss'],
  standalone: false
})
export class CreateCharacterPage implements OnInit {


  public alignments: Results = { count: 0, results: [] };
  public races: Results = { count: 0, results: [] };
  public classes: Results = { count: 0, results: [] };
  public backgrounds: Results = { count: 0, results: [] };
  public complete: boolean = false;
  public completeStats: boolean = false;
  public completeProficiencies: boolean = false;
  public completeClass: boolean = false;
  public classLevel: Level = {
      level: 0,
      ability_score_bonuses: 0,
      prof_bonus: 0,
      features: [],
      spellcasting: {
      cantrips_known: 0,
      spells_known: 0,
      spell_slots_level_1: 0,
      spell_slots_level_2: 0,
      spell_slots_level_3: 0,
      spell_slots_level_4: 0,
      spell_slots_level_5: 0,
      spell_slots_level_6: 0,
      spell_slots_level_7: 0,
      spell_slots_level_8: 0,
      spell_slots_level_9: 0
    },
    index: '',
    url: '',
    updated_at: ''
  };
  public class: Classes = {
   index: '',
   name: '',
   hit_die: 0,
   proficiency_choices: [],
   proficiencies: [],
   saving_throws: [],
   starting_equipment: [],
   starting_equipment_options: [],
   class_levels: '',
   subclasses: [],
   url: '',
   updated_at: ''
  };
  public racesComplete: RacesComplete = {
    index: '',
    name: '',
    speed: 0,
    ability_bonuses: [],
    size: '',
    size_description: '',
    starting_proficiencies: [],
    languages: [],
    traits: []
  };
  constructor(
    private characterCreationService: CharacterCreationService
  ) {

  }

  ngOnInit() {
    this.getInfoForInputs();

  }

  getInfoForInputs(){
    this.characterCreationService.getAlignments().subscribe(alignments => {
          this.alignments= alignments;
    }).add(() => {
      this.characterCreationService.getRaces().subscribe(races => {
        this.races = races;
      }).add(() => {
        this.characterCreationService.getClasses().subscribe(classes => {
              this.classes = classes;
          }).add(() => {
            this.characterCreationService.getBackgrounds().subscribe(backgrounds => {
                  this.backgrounds = backgrounds;
            });
          });
      });
  })
  }
  getInfoById(characterData: CharacterData) {
    this.characterCreationService.getClassById(characterData.class).subscribe(classData => {
      console.log('Class loaded from API');
      this.class = classData;
    }).add(() => {
      this.characterCreationService.getClassLevelById(characterData.class, characterData.level).subscribe(classData => {
        this.classLevel = classData;
      }).add(() => {
        this.characterCreationService.getRacesById(characterData.race).subscribe(raceData => {
          this.racesComplete = raceData;
          const  bonus = this.racesComplete.ability_bonuses.filter(bonus => bonus.ability_score.index === 'str');
    console.log('Bonus:', bonus);
        });
      });
    });
  }
  onComplete() {
    this.complete = true;
    const characterData: CharacterData = JSON.parse(sessionStorage.getItem('character') || '{}');
    if (characterData) {
      this.getInfoById(characterData);
    }
  }
  onStatsComplete() {
     this.completeStats = true;
  }
  onProficienciesComplete(){
    this.completeProficiencies = true;
  }
  onClassComplete() {
      this.completeClass = true;
    }
goBack(key: string) {
  switch (key) {
    case 'backStats':
      this.complete = false;
      break;
    case 'backProficiencies':
      this.completeStats = false;
      break;
    case 'backClass':
      this.completeProficiencies = false;
      break;
  }
  }

}

