import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/Services/noticias/noticias.service';
import { Noticias } from 'src/app/interfaces/Noticas';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit {


  allNoticias: Noticias[] = [];
  noticicas: Noticias[] = [];
  p:number = 1;

  constructor(private noticiasService:NoticiasService,
              private router:Router,
              private messageService:MessageService
              ){}

  ngOnInit(): void {
    this.noticiasService.getAllNoticias().subscribe((items)=>{
      const data = items.data
      data.map((items)=>{
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-br')
      })
      this.allNoticias = data
      this.noticicas = data
    })
  }

  editar(id:number){
    this.router.navigate([`/edit-noticias/${id}`])
  }

}
