import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { Agenda } from 'src/app/interfaces/Agenda';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { forkJoin, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';


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
    private petService: PetsService,
    private router: Router,
    private funcionarioService: FuncionarioService

  ) { }

  selected: Date | null | undefined;
  modalRef!: BsModalRef<any>;
  id: any;
  FullAgenda: Agenda[] = []
  agenda: Agenda[] = []
  p: number = 1;

  ngOnInit(): void {

    this.authService._id.subscribe((valor) => {
      this.id = valor;

    });



    this.agendaService.getAgendaEstabelecimento(this.id).subscribe((valor) => {
      this.FullAgenda = valor.data;



      this.FullAgenda.forEach((agend) => {


        agend.status == "1" ? agend.status = "Aceito" : agend.status = "Em andamento"

        agend.funcionario_id == null ? agend.funcionario_id = "Sem funcionários" : this.funcionarioService.getFuncionario(Number(agend.funcionario_id))
          .subscribe(func => { agend.funcionario_id = func.data.nome })

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

    this.agendaService.agendaDataEstabelecimento(this.id, teste).subscribe(item => {

      this.agenda = item.data

      this.agenda.forEach((agend) => {

        agend.status=="1"?agend.status="Aceito":agend.status="Em andamento"

        agend.funcionario_id==null?agend.funcionario_id="Sem funcionários":
          this.funcionarioService.getFuncionario(Number(agend.funcionario_id))
            .subscribe(func=>{agend.funcionario_id=func.data.nome})

        this.petService.getPet(Number(agend.pet_id)).subscribe((pet) => {
          agend.pet_id = pet.data.nome
        })

      });
      this.modalRef=this.modalService.show(this.myModal,{class:'modal-lg'});
    });
  }


  fecharModal(): void {
    this.modalRef.hide();
  }

  botaEditar(id: number) {
    this.router.navigate([`edit-agendas/${id}`])
    this.fecharModal()
  }
}