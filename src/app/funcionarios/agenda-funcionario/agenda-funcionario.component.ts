import { Component } from '@angular/core';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Agenda } from 'src/app/interfaces/Agenda';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agenda-funcionario',
  templateUrl: './agenda-funcionario.component.html',
  styleUrls: ['./agenda-funcionario.component.css']
})
export class AgendaFuncionarioComponent {

  agendas: Agenda[] = [];
  p: number = 1;
  servId!: string;



  constructor(
    private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private petService: PetsService,
    private router: Router,
    private location: Location,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {

    const id = localStorage.getItem('id')

    this.agendaService.getAgendaFuncionario(Number(id)).subscribe((item) => {
      this.agendas = item.data

      this.agendas.forEach((agend) => {

        agend.status == "1" ? agend.status = "Aceito" : agend.status = "Em andamento"

        agend.funcionario_id == null ? agend.funcionario_id = "Sem Funcionário" : this.funcionarioService.getFuncionario(Number(agend.funcionario_id))
          .subscribe((item) => { agend.funcionario_id = item.data.nome })

        this.petService.getPet(Number(agend.pet_id)).subscribe((item) => {
          agend.pet_id = item.data.nome
        })
      })

    })

  }

  botaoFechar(id: number) {
    this.agendaService.fecharAgendas(id).subscribe((item: any) => {
      this.messageService.add(item.msg)
      this.router.navigate(['agenda-funcionarios'])
    })
  }
  botaoEmAtendimento(id: number) {
    this.agendaService.emAtendimentoAgenda(id).subscribe((item: any) => {
      
      this.messageService.add(item.msg)
      window.location.reload()
    })
  }

}
