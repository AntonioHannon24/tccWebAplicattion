import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/Services/noticias/noticias.service';
import { Noticias } from 'src/app/interfaces/Noticas';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {


  noticias1: Noticias | null | undefined ;
  noticias2: Noticias | null | undefined;
  noticias3: Noticias | null | undefined;
  noticias4: Noticias | null | undefined;
  noticias5: Noticias[] = [];
  noticias6: Noticias[] = [];

  baseApiUrl = environment.baseApiUrl;

  constructor(private noticiasService: NoticiasService) { }
  ngOnInit(): void {
    this.noticiasService.getAllNoticias().subscribe((items) => {
      const todasNoticias = items.data;


      for (let i = 0; i < todasNoticias.length; i++) {
        if (i < 1) {
          this.noticias1 = todasNoticias[i];
        } else if (i < 2) {
          this.noticias2 = todasNoticias[i];
        } else if (i < 3) {
          this.noticias3 = todasNoticias[i];
        } else if (i < 4) {
          this.noticias4 = todasNoticias[i];
        } else if (i < 6) {
          this.noticias5.push(todasNoticias[i]);
        } else {
          this.noticias6.push(todasNoticias[i]);
        }
      }

    })
  }

}
