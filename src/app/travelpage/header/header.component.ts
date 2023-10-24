import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  logado?: boolean;
  isAdmin?: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(valor => {
      this.logado = valor;
    });
    /*
    this.authService.role.subscribe((valor)=>{
      this.isAdmin = valor
    })
    */
  }
  logoff() {

    this.authService.logoff().then(() => {
      this.router.navigate(['']).then(() => {
        location.reload()
      })
    })
  }

}
