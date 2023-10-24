import { Component } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tccWebAplicattion';
  showHead: boolean = false;
  inHome:boolean = false;

  constructor(private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHead = false;
        } else {

          this.showHead = true;
        }
        if(event['url'] == '/home'){
          this.inHome = true
        }else{
          this.inHome = false
        }
      }
    });
  }

}
