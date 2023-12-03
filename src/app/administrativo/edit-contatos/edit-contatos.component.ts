import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Contato } from 'src/app/interfaces/Contato';
import { ContatoService } from 'src/app/Services/contato/contato.service';

@Component({
  selector: 'app-edit-contatos',
  templateUrl: './edit-contatos.component.html',
  styleUrls: ['./edit-contatos.component.css']
})
export class EditContatosComponent implements OnInit {

  contato!:Contato
  btnText:string = "Editar"
  title:string = "Editar Contato"

  constructor(
    private contatoService:ContatoService,
    private route:ActivatedRoute,
    private message:MessageService,
    private router:Router,
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.contatoService.getContato(id).subscribe(item=>{
      this.contato = item.data;
    })
  }
 
  goHome(){
    this.router.navigate(['/'])
    this.message.add("O contato foi editada com sucesso!!")
  }

}