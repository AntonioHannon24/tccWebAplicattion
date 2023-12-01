import { Component, EventEmitter, Output } from '@angular/core';
import { Servicos } from 'src/app/interfaces/Servicos';
import { ServiceService } from 'src/app/Services/service/service.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';

@Component({
  selector: 'app-new-services',
  templateUrl: './new-services.component.html',
  styleUrls: ['./new-services.component.css']
})
export class NewServicesComponent {

  title: string = "Novo Serviço"
  btnText: string = 'Criar'
  id!: number
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private servicosService: ServiceService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.id = Number(localStorage.getItem('id'))
  }

  async createHandle(servico: Servicos) {

    const formData = new FormData();
    formData.append("id", servico.id)
    formData.append("nome", servico.nome)
    formData.append("valor", servico.valor)
    formData.append("descricao", servico.descricao)
    formData.append("estabelecimento_id", servico.estabelecimento_id)

    await this.servicosService.createServico(formData)

      .subscribe(
        {
          next: (response: any) => {
            localStorage.setItem('message', response.message);
            window.location.reload();
            this.formularioEnviado.emit();
          },
          error: error => {
            console.log(error)
            window.alert(error.error.message);

          }
        }
      )
  }


}
