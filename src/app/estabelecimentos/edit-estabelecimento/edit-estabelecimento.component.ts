import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { ActivatedRoute,Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';


@Component({
  selector: 'app-edit-estabelecimento',
  templateUrl: './edit-estabelecimento.component.html',
  styleUrls: ['./edit-estabelecimento.component.css']
})
export class EditEstabelecimentoComponent {



  estabelecimento!:Estabelecimento
  btnText:string = "Editar"
  title:string = "Edite seu Estabelecimento"
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private estabelecimentoService:EstabelecimentoService,
    private route:ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id = localStorage.getItem('id')
    this.estabelecimentoService.getEstabelecimento(Number(id)).subscribe(item=>{
      this.estabelecimento = item.data;
    })
  
  }

  async editHandler(estabelecimento:Estabelecimento){

    const id = this.estabelecimento.id
    const formData = new FormData();
    
    formData.append("nome",estabelecimento.nome)
    formData.append("cnpj",estabelecimento.cnpj)
    formData.append("endereco",estabelecimento.endereco)
    formData.append("telefone",estabelecimento.telefone)
    formData.append("logo",estabelecimento.logo)
    formData.append("cep",estabelecimento.cep)
    formData.append("email",estabelecimento.email)
    formData.append("cidadeId",estabelecimento.cidade_id)

   
    await this.estabelecimentoService.updateEstab(id!,formData).subscribe(()=>{
      localStorage.setItem('message',"Serviço editado com sucesso!!") 
      window.location.reload()
      this.formularioEnviado.emit();
    })
    
  }


}
