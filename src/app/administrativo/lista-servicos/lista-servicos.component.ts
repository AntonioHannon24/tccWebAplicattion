import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/Services/service/service.service';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Servicos } from 'src/app/interfaces/Servicos';

@Component({
  selector: 'app-lista-servicos',
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css']
})

export class ListaServicosComponent implements OnInit {

  servicos: Servicos[] = [];
  usuarioId?: number;
  baseApiUrl = environment.baseApiUrl;
  idEstab!: number;
  p: number = 1;
  @ViewChild('myModal') myModal: any;
  @ViewChild('myModalEdit') myModalEdit: any;
  serv!: number;
  modalRef!: BsModalRef<any>

  constructor(
    private route: ActivatedRoute,
    private servicoService: ServiceService,
    private location: Location,
    private modalService: BsModalService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')
    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }
    this.idEstab = Number(this.route.snapshot.paramMap.get('id'))
    this.servicoService.servicoEstab(this.idEstab).subscribe(item => {
      const servicos = item.data
      servicos?.forEach((item) => {
        item.status == 1 ? item.status = "Ativo" : item.status = "Desativado"
        this.servicos.push(item)
      })

    });
  }

  editServico(servicoId: number) {
    this.serv = servicoId
    this.modalRef = this.modalService.show(this.myModalEdit, { class: 'modal-lg' })
  };

  async desativarServico(servId: number) {
    this.servicoService.desativarServico(servId).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })
  }

  async ativarServico(idServ: number) {
    this.servicoService.ativarServico(idServ).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })

  }

  voltar() {
    this.location.back()
  }

  fecharModal(): void {
    this.modalRef.hide();
  }

  novoServico() {
    this.modalRef = this.modalService.show(this.myModal, { class: 'modal-lg' })
  }

}
