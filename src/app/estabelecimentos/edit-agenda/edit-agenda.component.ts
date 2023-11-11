import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { Agenda } from 'src/app/interfaces/Agenda';
import { forkJoin } from 'rxjs';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-edit-agenda',
  templateUrl: './edit-agenda.component.html',
  styleUrls: ['./edit-agenda.component.css']
})
export class EditAgendaComponent {


  agenda!: Agenda
  btnText: string = "Editar"
  title: string = "Editar Agenda"


  constructor(
    private agendaService: AgendaService,
    private route: ActivatedRoute,
    private funcionarioService: FuncionarioService,
    private petService: PetsService,
    private usuarioService: UsuariosService,
    private serviceServices: ServiceService

  ) { }


  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    let funcionarioResult, petResult, usuarioResult, servicoResult;

    this.agendaService.getAgenda(id).subscribe(agendaResult => {

      const agendaLoad = agendaResult.data;

      funcionarioResult = this.funcionarioService.getFuncionario(Number(agendaLoad.funcionario_id));
      petResult = this.petService.getPet(Number(agendaLoad.pet_id));
      usuarioResult = this.usuarioService.getUsuario(Number(agendaLoad.usuario_id));
      servicoResult = this.serviceServices.getServico(Number(agendaLoad.servico_id))


      forkJoin({
        funcionario: funcionarioResult,
        pet: petResult,
        usuario: usuarioResult,
        servico: servicoResult,

      }).subscribe(results => {

        this.agenda = {
          ...agendaLoad,
          funcionario_id: results.funcionario.data.nome,
          pet_id: results.pet.data.nome,
          usuario_id: results.usuario.data.nome,
          servico_id: results.servico.data.nome
        };
      });
    });
  }


  async editHandler(agendaData: Agenda) {

    const id = this.agenda.id

    const formData = new FormData()

    formData.append('id', agendaData.data_hora)
    formData.append('email', agendaData.status)
    formData.append("funcao", agendaData.servico_id)
    formData.append("foto", agendaData.usuario_id)
    formData.append("cidade_id", agendaData.funcionario_id)
    formData.append("password", agendaData.pet_id)


    await this.agendaService.updateAgenda(id!, formData).subscribe()
  }




}
