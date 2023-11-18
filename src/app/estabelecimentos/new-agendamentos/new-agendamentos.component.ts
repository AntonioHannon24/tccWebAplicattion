import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/interfaces/Agenda';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { ServiceService } from 'src/app/Services/service/service.service';
import { forkJoin } from 'rxjs';
import { Funcionario } from 'src/app/interfaces/Funcionario';

@Component({
  selector: 'app-new-agendamentos',
  templateUrl: './new-agendamentos.component.html',
  styleUrls: ['./new-agendamentos.component.css']
})
export class NewAgendamentosComponent implements OnInit {


  agendas: Agenda[] = [];
  agenda!: Agenda;
  p: number = 1;
  servId!: string;
  @ViewChild('myModal') myModal: any;
  modalRef!: BsModalRef<any>;
  public funcionarioSelecionado: any;


  funcionarios: Funcionario[] = [];





  constructor(private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private petService: PetsService,
    private router: Router,
    private location: Location,
    private messageService: MessageService,
    private modalService: BsModalService,
    private usuarioService: UsuariosService,
    private servicoService: ServiceService,
  ) { }
  ngOnInit(): void {

    const id = localStorage.getItem('id')

    this.agendaService.agendaEstabelecimentosNovo(Number(id)).subscribe((item) => {
      this.agendas = item.data

      this.agendas.forEach((agend) => {
        agend.status = "Novo"
        agend.funcionario_id == null ? agend.funcionario_id = "Sem Funcionário" : this.funcionarioService.getFuncionario(Number(agend.funcionario_id))
          .subscribe((item) => { agend.funcionario_id = item.data.nome })

        this.petService.getPet(Number(agend.pet_id)).subscribe((item) => {
          agend.pet_id = item.data.nome
        })
      })
    })
    this.funcionarioService.funcionariosEstab(Number(id)).subscribe(item => {
      this.funcionarios = item.data
    })


  }

  botaoAceitar(id: number) {

    let petResult, usuarioResult, servicoResult;

    this.agendaService.getAgenda(id).subscribe((item: any) => {

      const agendaLoad = item.data;

      petResult = this.petService.getPet(Number(agendaLoad.pet_id))
      usuarioResult = this.usuarioService.getUsuario(Number(agendaLoad.usuario_id))
      servicoResult = this.servicoService.getServico(Number(agendaLoad.servico_id))

      forkJoin({
        pet: petResult,
        usuario: usuarioResult,
        servico: servicoResult
      }).subscribe(results => {
        this.agenda = {
          ...agendaLoad,
          pet_id: results.pet.data.nome,
          usuario_id: results.usuario.data.nome,
          servico_id: results.servico.data.nome,
          status: "Novo"

        }
        this.modalRef = this.modalService.show(this.myModal, { class: 'modal-lg' });
      })
    })
  }

  recusarAgendas(id: number) {
    this.agendaService.recusarAgendas(id).subscribe((item: any) => {
      this.router.navigate(['agenda'])
      this.messageService.add(item.msg)
    })
  }
  botaoVoltar() {
    this.location.back()
  }
  fecharModal(): void {
    this.modalRef.hide();
  }
  submit() {

    if (this.funcionarioSelecionado === undefined) {
      window.alert("Funcionario vazio!")
    } else {
      this.agendaService.aceitarAgendas(this.agenda.id, this.funcionarioSelecionado).subscribe((item: any) => {
        this.fecharModal()
        this.router.navigate(['agenda'])
        this.messageService.add(item.msg)
      })
    }
  }
}
