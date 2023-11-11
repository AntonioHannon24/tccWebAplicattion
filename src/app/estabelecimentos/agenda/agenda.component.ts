import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { Agenda } from 'src/app/interfaces/Agenda';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { forkJoin, map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @ViewChild('myModal') myModal: any;
  teste: string = "";

  constructor(public agendaService: AgendaService,
    private authService: AuthService,
    private modalService: BsModalService,
    private funcionarioService: FuncionarioService,
    private petService: PetsService,
    private router:Router
  ) { }

  selected: Date | null | undefined;
  modalRef!: BsModalRef<any>;
  id: any;
  FullAgenda: Agenda[] = []
  agenda: Agenda[] = []

  ngOnInit(): void {

    this.authService._id.subscribe((valor) => {
      this.id = valor;

    });

    this.agendaService.getAgendaEstabelecimento(this.id).subscribe((valor) => {
      this.FullAgenda = valor.data;

      this.FullAgenda.forEach((agend) => {
        this.funcionarioService.getFuncionario(Number(agend.funcionario_id)).subscribe((func) => {
          agend.funcionario_id = func.data.nome;
        });
        this.petService.getPet(Number(agend.pet_id)).subscribe((pet) => {
          agend.pet_id = pet.data.nome
        })
      });

    });

  }

  async dataSelecionada(event: any): Promise<void> {
    const year = this.selected!.getFullYear();
    const month = (this.selected!.getMonth() + 1).toString().padStart(2, '0');
    const day = this.selected!.getDate().toString().padStart(2, '0');
    const teste = `${year}-${month}-${day}`;

    const agendaData$ = this.agendaService.agendaDataEstabelecimento(this.id, teste);

    agendaData$.subscribe(item => {
      this.agenda = item.data;

      const observables = this.agenda.map(agend => {
        const funcionario$ = this.funcionarioService.getFuncionario(Number(agend.funcionario_id));
        const pet$ = this.petService.getPet(Number(agend.pet_id));

        return forkJoin([funcionario$, pet$]).pipe(
          map(([funcionario, pet]) => {
            agend.funcionario_id = funcionario.data.nome;
            agend.pet_id = pet.data.nome;
            return agend;
          })
        );
      });

      forkJoin(observables).subscribe(agenda => {
        this.agenda = agenda;
        console.log(agenda)
        this.modalRef = this.modalService.show(this.myModal);
      });
    });
  }
  fecharModal(): void {
    this.modalRef.hide();
  }

  botaEditar(id:number){
    this.router.navigate([`edit-agendas/${id}`])
  }
}