import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Servicos } from 'src/app/interfaces/Servicos';
import { ServiceService } from 'src/app/Services/service/service.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';

@Component({
  selector: 'app-edit-servicos',
  templateUrl: './edit-servicos.component.html',
  styleUrls: ['./edit-servicos.component.css']
})
export class EditServicosComponent {

  title: string = "Editar Serviço"
  btnText: string = 'Editar'
  servico!: Servicos
  @Input() id!: number
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private servicosService: ServiceService,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {

    this.servicosService.getServico(this.id).subscribe(item => {
      this.servico = item.data;
    })

  }


  async editHandler(servico: Servicos) {

    const id = this.servico.id

    const formData = new FormData();

    formData.append("id", servico.id)
    formData.append("nome", servico.nome)
    formData.append("valor", servico.valor)
    formData.append("descricao", servico.descricao)
    formData.append("estabelecimento_id", servico.estabelecimento_id)

    await this.servicosService.updateServico(id!, formData)

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

