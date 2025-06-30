import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterData } from 'src/app/interfaces/character-data';

@Component({
  selector: 'app-class-options',
  templateUrl: './class-options.component.html',
  styleUrls: ['./class-options.component.scss'],
  standalone: false
})
export class ClassOptionsComponent  implements OnInit {

  @Output() back = new EventEmitter<string>();
  @Output() classComplete = new EventEmitter<void>();
  classForm: FormGroup

  constructor(
    private location: Location,
    private fb: FormBuilder
  ) {
    this.classForm = this.fb.group({
      name: ['', [Validators.required]],
      class: ['', [Validators.required]],
      background: ['', [Validators.required]],
      alignment: ['', [Validators.required]],
      level: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      race: ['', [Validators.required]],
    }); }

  ngOnInit() {
    const characterData: CharacterData = JSON.parse(sessionStorage.getItem('character') || '{}');
    console.log('Character loaded from sessionStorage');
    console.log(characterData.class);
  }

  send(){
    sessionStorage.setItem('class', JSON.stringify(this.classForm.value));
    console.log('Class saved to sessionStorage');
    console.log(this.classForm.value);
    this.classComplete.emit();
  }

  onClick() {
    this.back.emit('backClass');
  }

}
