import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {



  baseApiUrl = environment.baseApiUrl
  allEstabs: Estabelecimento[] = []
  estabelecimentos: Estabelecimento[] = [];
  userId?: any
  p: number = 1;
  @ViewChild('myModal') myModal:any;
  @ViewChild('myModalEdit') myModalEdit: any;
  modalRef!:BsModalRef<any>
  idEstab!:number

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private router: Router,
    public messageService: MessageService,
    private modalService:BsModalService
  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')

    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }


    this.estabelecimentoService.getAllEstabelecimentos().subscribe((items) => {
      const data = items.data
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-br')
      })
      data.forEach((item) => {
        item.status == 1 ? item.status = "Ativo" : item.status = "Desativado"
        this.estabelecimentos.push(item)
      })

      this.allEstabs = data
      this.estabelecimentos = data
    })
  }

  async desativarEstabelecimento(servId: number) {
    this.estabelecimentoService.desativarEstabelecimentos(servId).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })
  }
  async ativarEstabelecimento(idServ: number) {

    await this.estabelecimentoService.ativarEstabelecimentos(idServ).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })

  }
  editar(id: number) {
    this.idEstab = Number(id);
    this.modalRef = this.modalService.show(this.myModal,{class:'modal-lg'})
    //this.router.navigate([`/edit-estabelecimentos/${id}`])
  }
  listaFuncionarios(id: number) {
    this.router.navigate([`/lista-funcionarios/${id}`])
  }
  listaServicos(id: number) {
    this.router.navigate([`/lista-servicos/${id}`])
  }
  listaAgenda(id: number) {
    this.router.navigate([`/lista-agenda/${id}`])
  }
  fecharModal(): void {
    this.modalRef.hide();
  }

}

