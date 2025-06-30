import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserData } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false
})
export class LoginFormComponent  implements OnInit {

  @Input() usernameOrEmail: string = '';
  @Input() password: string = '';
  @Input() rememberMe: boolean = false;
  @Output() complete = new EventEmitter<UserData>();
  loginForm: FormGroup

  constructor(
   private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
   }

  ngOnInit() {}


  enviar() {
    this.complete.emit(this.loginForm.value);
  }
}
