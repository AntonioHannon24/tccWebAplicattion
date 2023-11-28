import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceService } from 'src/app/Services/service/service.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Servicos } from 'src/app/interfaces/Servicos';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent {

  

  servico: Servicos[] = []
  usuarioId?: number;
  baseApiUrl = environment.baseApiUrl;
  idEstab!: any
  p: number = 1;
  @ViewChild('myModal') myModal: any;
  @ViewChild('myModalEdit') myModalEdit: any;
  modalRef!: BsModalRef<any>
  serv!: number

  constructor(
    private servicoService: ServiceService,
    private location: Location,
    private messageService: MessageService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')

    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }

    this.idEstab = localStorage.getItem('id')

    this.servicoService.servicoEstab(this.idEstab).subscribe(item => {
      const servicos = item.data
      servicos?.forEach((item) => {
        item.status == 1 ? item.status = "Ativo" : item.status = "Desativado"
        this.servico.push(item)
      })
    });
  }


  editServico(servicoId: number) {
    this.serv = servicoId
    this.modalRef = this.modalService.show(this.myModalEdit, { class: 'modal-lg' })
  };
  voltar() {
    this.location.back()
  }

  novoServico() {
    this.modalRef = this.modalService.show(this.myModal, { class: 'modal-lg' })
  }


  fecharModal(): void {
    this.modalRef.hide();
  }

  async desativarServico(servId: number) {
    this.servicoService.desativarServico(servId).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })
  }
  async ativarServico(idServ: number) {

    await this.servicoService.ativarServico(idServ).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })

  }
}
