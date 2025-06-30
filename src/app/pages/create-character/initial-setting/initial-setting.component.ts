import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Results } from 'src/app/interfaces/results';

@Component({
  selector: 'app-initial-setting',
  templateUrl: './initial-setting.component.html',
  styleUrls: ['./initial-setting.component.scss'],
  standalone: false
})
export class InitialSettingComponent  implements OnInit {

@Input() alignments!: Results;
@Input() races!: Results;
@Input() classes!: Results;
@Input() backgrounds!: Results;
@Output() complete = new EventEmitter<boolean>();
 characterForm: FormGroup

  constructor(
   private fb: FormBuilder,
   private location: Location
  ) {
    this.characterForm = this.fb.group({
      name: ['', [Validators.required]],
      class: ['', [Validators.required]],
      background: ['', [Validators.required]],
      alignment: ['', [Validators.required]],
      level: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      race: ['', [Validators.required]],
    });
   }

  ngOnInit() {}


  enviar() {
    sessionStorage.setItem('character', JSON.stringify(this.characterForm.value));
    console.log('Character saved to sessionStorage');
    console.log(this.characterForm.value);
    this.complete.emit(true);
  }
  onClick() {
    this.location.back();
  }
}
