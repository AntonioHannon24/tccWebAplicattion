import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/interfaces/Agenda';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-fechados',
  templateUrl: './lista-fechados.component.html',
  styleUrls: ['./lista-fechados.component.css']
})
export class ListaFechadosComponent implements OnInit {

  agendas: Agenda[] = [];
  p: number = 1;
  servId!: string;



  constructor(private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private petService: PetsService,
    private router:Router,
    private location:Location
  ) { }
  ngOnInit(): void {

    const id = localStorage.getItem('id')




    this.agendaService.agendaEstabelecimentosFechado(Number(id)).subscribe((item) => {
      this.agendas = item.data

      this.agendas.forEach((agend) => {
        agend.status ="Fechado"
        agend.funcionario_id == null ? agend.funcionario_id = "Sem Funcionário" : this.funcionarioService.getFuncionario(Number(agend.funcionario_id))
          .subscribe((item) => { agend.funcionario_id = item.data.nome })
        
        this.petService.getPet(Number(agend.pet_id)).subscribe((item) => {
          agend.pet_id = item.data.nome
        })
      })


    })

  }

  botaEditar(id: number) {
    this.router.navigate([`edit-agendas/${id}`])
  }
  botaoVoltar(){
    this.location.back()
  }

}
