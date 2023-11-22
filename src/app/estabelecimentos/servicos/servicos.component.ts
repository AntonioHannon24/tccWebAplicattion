import { Component, ViewChild } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { environment } from 'src/environments/environment';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ServiceService } from 'src/app/Services/service/service.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent {


  estabelecimento?: Estabelecimento;
  usuarioId?: number;
  baseApiUrl = environment.baseApiUrl;
  idEstab!: any
  p: number = 1;
  @ViewChild('myModal') myModal: any;
  @ViewChild('myModalEdit') myModalEdit: any;
  modalRef!: BsModalRef<any>
  serv!: number

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private authService: AuthService,
    private servicoService: ServiceService,
    private location: Location,
    private messageService: MessageService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')

    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }

    this.authService._id.subscribe(valor => {
      this.idEstab = valor;
    });
    this.estabelecimentoService.getEstabelecimento(this.idEstab).subscribe(item => {
      this.estabelecimento = item.data;
    });
  }

  async removeServico(servicoId: number) {
    await this.servicoService.removeServico(servicoId).subscribe((item: any) => {
      localStorage.setItem('message', item.message)
      window.location.reload();
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
}
