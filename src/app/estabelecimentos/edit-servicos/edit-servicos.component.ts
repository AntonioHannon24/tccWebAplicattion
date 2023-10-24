import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicos } from 'src/app/interfaces/Servicos';
import { ServiceService } from 'src/app/Services/service/service.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-servicos',
  templateUrl: './edit-servicos.component.html',
  styleUrls: ['./edit-servicos.component.css']
})
export class EditServicosComponent {

  title: string = "Editar Serviço"
  btnText: string = 'Editar'
  servico!: Servicos

  constructor(
    private servicosService: ServiceService,
    private router: ActivatedRoute,
    public messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {

    const id = Number(this.router.snapshot.paramMap.get('id'))
    this.servicosService.getServico(id).subscribe(item => {
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

    await this.servicosService.updateServico(id!, formData).subscribe(() => { this.goHome() })
  }
  goHome() {
    this.voltar()
    this.messageService.add("Serviço editado com sucesso!!")
  }
  voltar() {
    this.location.back()
  }

}

