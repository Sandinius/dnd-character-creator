import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/interfaces/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  usernameOrEmail: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
onLoginComplete(event:UserData) {
    console.log('Login complete:', event);
    console.log(event.usernameOrEmail);
    console.log(event.password);

    if(event.usernameOrEmail == 'admin' && event.password == '123456') {
      console.log('Login successful');
      this.router.navigate(['/main-menu']);
    }
  }
}
