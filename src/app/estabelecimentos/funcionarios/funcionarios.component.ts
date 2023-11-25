import { Component, ViewChild } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {

  estabelecimento?: Estabelecimento;
  baseApiUrl = environment.baseApiUrl;
  idEstab!: any;
  p: number = 1;

  funcionarios: Funcionario[] = []
  @ViewChild('myModal') myModal: any;
  @ViewChild('myModalEdit') myModalEdit: any;
  modalRef!: BsModalRef<any>
  func!: number

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private modalService: BsModalService,
    private agendaSerive: AgendaService,
  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')
    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }

    this.idEstab = localStorage.getItem('id');

    this.estabelecimentoService.getEstabelecimento(this.idEstab).subscribe(item => {
      const teste = item.data.funcionario
      teste?.forEach((item) => {
        item.status == 1 ? item.status = "Ativo" : item.status = "Desativado"
        this.funcionarios.push(item)
      })
    });
  }

  async desativarFuncionario(idFuncNumber: number) {


    this.agendaSerive.getAgendaFuncionario(idFuncNumber).subscribe((item) => {

      const agendaNumber = item.data.length
      console.log(agendaNumber)


      if (agendaNumber >= 1) {
        window.alert("O funcionário está atrelado a um atendimento em andamento!!!")
      } else {
        this.funcionarioService.desativarFuncionario(idFuncNumber).subscribe((item: any) => {
          localStorage.setItem('message', item.msg)
          window.location.reload()
        })
      }
    })

    console.log(idFuncNumber)

  }
  async ativarFuncionario(idFuncNumber: number) {

    await this.funcionarioService.ativarFuncionario(idFuncNumber).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })

  }

  fecharModal(): void {
    this.modalRef.hide();
  }

  novoFuncionario() {
    this.modalRef = this.modalService.show(this.myModal, { class: 'modal-lg' })
  }

  editarFuncionario(funcId: number) {

    this.func = funcId
    console.log(this.func)
    this.modalRef = this.modalService.show(this.myModalEdit, { class: 'modal-lg' })
  };
}


