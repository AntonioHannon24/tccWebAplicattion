import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Contato } from 'src/app/interfaces/Contato';
import { ContatoService } from 'src/app/Services/contato/contato.service';


@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit{



  allContato: Contato[] = [];
  contatos: Contato[] = [];
  p:number = 1;

  constructor(private contatoService:ContatoService,
              private router:Router,
              private messageService:MessageService
              ){}

  ngOnInit(): void {
    this.contatoService.getAllContato().subscribe((items)=>{
      const data = items.data
      data.map((items)=>{
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-br')
      })
      this.allContato = data
      this.contatos = data
    })
  }

  editar(id:number){
    this.router.navigate([`/edit-contatos/${id}`])
  }

}
