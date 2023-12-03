import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agenda } from 'src/app/interfaces/Agenda';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Funcionario } from 'src/app/interfaces/Funcionario';

@Component({
  selector: 'app-lista-agenda',
  templateUrl: './lista-agenda.component.html',
  styleUrls: ['./lista-agenda.component.css']
})

export class ListaAgendaComponent implements OnInit {

  agendas: Agenda[] = [];
  agenda!: Agenda;
  p: number = 1;
  agend!: number
  servId!: string;
  @ViewChild('myModalEdit') myModalEdit: any;
  modalRef!: BsModalRef<any>;
  funcionarios: Funcionario[] = [];

  constructor(private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private petService: PetsService,
    private location: Location,
    private messageService: MessageService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))
    const mensagem = localStorage.getItem('message')
    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }
    this.agendaService.allAgendamentosEstab(id).subscribe((item) => {
      this.agendas = item.data
      this.agendas.forEach((agend) => {
        agend.funcionario_id == null ? agend.funcionario_id = "Sem Funcionário" : this.funcionarioService.getFuncionario(Number(agend.funcionario_id))
          .subscribe((item) => { agend.funcionario_id = item.data.nome 
        })
        this.petService.getPet(Number(agend.pet_id)).subscribe((item) => {
          agend.pet_id = item.data.nome
        })
        if (agend.status == "0") {
          agend.status = "Novo";
        } else if (agend.status == "1") {
          agend.status = "Aceito";
        } else if (agend.status == "2") {
          agend.status = "Em atendimento";
        } else if (agend.status == "3") {
          agend.status = "Fechado";
        }

      })
    })
    this.funcionarioService.funcionariosEstab(Number(id)).subscribe(item => {
      this.funcionarios = item.data
    })
  }

  botaEditar(id: number) {
    this.agend = id
    this.modalRef = this.modalService.show(this.myModalEdit, { class: 'modal-lg' })
  }

  botaoVoltar() {
    this.location.back()
  }
  fecharModal(): void {
    this.modalRef.hide();
  }

}
