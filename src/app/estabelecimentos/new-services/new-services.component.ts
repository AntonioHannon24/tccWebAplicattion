import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicos } from 'src/app/interfaces/Servicos';
import { ServiceService } from 'src/app/Services/service/service.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-services',
  templateUrl: './new-services.component.html',
  styleUrls: ['./new-services.component.css']
})
export class NewServicesComponent {

  title:string = "Novo Serviço"
  btnText:string = 'Criar'
  id!:number

  constructor(
    private servicosService:ServiceService,
    private router:ActivatedRoute,
    private location:Location,
    public messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'))
  }

  async createHandle(servico:Servicos){
    
    const formData = new FormData();
    formData.append("id",servico.id)
    formData.append("nome",servico.nome)
    formData.append("valor",servico.valor)
    formData.append("descricao",servico.descricao)
    formData.append("estabelecimento_id",servico.estabelecimento_id)
   
    await this.servicosService.createServico(formData).subscribe(()=>{this.message();this.voltar()})
  }
  message():void{
    this.messageService.add('Servico criado com sucesso!!')
  }
  voltar():void{
    this.location.back()
  }
}
