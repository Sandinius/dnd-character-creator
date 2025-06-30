import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    const esWeb = !Capacitor.isNativePlatform();
      if (esWeb) {
        document.body.classList.add('fondo-web');
      }else{
        document.body.classList.add('fondo-app');
      }
  }


}
