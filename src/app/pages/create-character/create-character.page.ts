import { Component, OnInit } from '@angular/core';
import { CharacterData } from 'src/app/interfaces/character-data';
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
  constructor(
    private characterCreationService: CharacterCreationService
  ) {

  }

  ngOnInit() {
    this.getAlignments()
    this.getRaces();
    this.getClasses();
    this.getBackgrounds();
  }

  getAlignments() {
    this.characterCreationService.getAlignments().subscribe(alignments => {
      this.alignments= alignments;
    });
  }
  getRaces() {
    this.characterCreationService.getRaces().subscribe(races => {
      this.races = races;
    });
  }
  getClasses() {
    this.characterCreationService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
  }
  getBackgrounds() {
    this.characterCreationService.getBackgrounds().subscribe(backgrounds => {
      this.backgrounds = backgrounds;
    });
  }
  getClassById(id: string) {
    this.characterCreationService.getClassById(id).subscribe(classData => {
      console.log('Class loaded from API');
      console.log(classData);
    });
  }
  onComplete() {
    this.complete = true;
    const characterData: CharacterData = JSON.parse(sessionStorage.getItem('character') || '{}');
    if (characterData) {
      this.getClassById(characterData.class);
    }
  }
onClassComplete() {
  const classData: CharacterData = JSON.parse(sessionStorage.getItem('class') || '{}');
  if (classData) {
    console.log('Class loaded from sessionStorage');
    console.log(classData);
  }
}
goBack(){
  this.complete = false;
}
}
