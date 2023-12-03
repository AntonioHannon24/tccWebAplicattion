import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { ContatoService } from 'src/app/Services/contato/contato.service';
import { Contato } from 'src/app/interfaces/Contato';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {


  title:string = "Entre em contato"
  btnText:string = 'Criar'
  contatoForm!: FormGroup;

  constructor(
    private contatoService:ContatoService,
    private location:Location,
    public messageService:MessageService
  ) { }

  ngOnInit(): void {}


  async createHandle(contato:Contato){
    
    const formData = new FormData();
    formData.append("nome",contato.nome)
    formData.append("email",contato.email)
    formData.append("assunto",contato.assunto)
    formData.append("mensagem",contato.mensagem)
   
    this.contatoService.createContato(formData).subscribe(()=>{this.message();this.voltar()})
  }

  message():void{
    this.messageService.add('Contato criado com sucesso!!')
  }

  voltar():void{
    this.location.back()
  }




 

}
