import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/interfaces/Agenda';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/Services/MessageServices/message.service';

@Component({
  selector: 'app-new-agendamentos',
  templateUrl: './new-agendamentos.component.html',
  styleUrls: ['./new-agendamentos.component.css']
})
export class NewAgendamentosComponent {


    agendas: Agenda[] = [];
    p: number = 1;
    servId!: string;
  
  
  
    constructor(private agendaService: AgendaService,
      private funcionarioService: FuncionarioService,
      private petService: PetsService,
      private router:Router,
      private location:Location,
      private messageService:MessageService,
    ) { }
    ngOnInit(): void {
  
      const id = localStorage.getItem('id')
  
  
  
  
      this.agendaService.agendaEstabelecimentosNovo(Number(id)).subscribe((item) => {
        this.agendas = item.data
  
        this.agendas.forEach((agend) => {
          agend.status ="Novo"
          agend.funcionario_id == null ? agend.funcionario_id = "Sem Funcionário" : this.funcionarioService.getFuncionario(Number(agend.funcionario_id))
            .subscribe((item) => { agend.funcionario_id = item.data.nome })
          
          this.petService.getPet(Number(agend.pet_id)).subscribe((item) => {
            agend.pet_id = item.data.nome
          })
        })
  
  
      })
  
    }
  
    botaoAceitar(id: number) {
      this.agendaService.aceitarAgendas(id).subscribe((item:any)=>{
        this.router.navigate(['agenda'])
        this.messageService.add(item.msg)
      })
    }
    botaoVoltar(){
      this.location.back()
    }
  
  }
  