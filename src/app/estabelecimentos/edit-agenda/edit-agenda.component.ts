import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { PetsService } from 'src/app/Services/pets/pets.service';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { Agenda } from 'src/app/interfaces/Agenda';
import { forkJoin } from 'rxjs';
import { ServiceService } from 'src/app/Services/service/service.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';



@Component({
  selector: 'app-edit-agenda',
  templateUrl: './edit-agenda.component.html',
  styleUrls: ['./edit-agenda.component.css']
})
export class EditAgendaComponent {

  agenda!: Agenda
  btnText: string = "Editar"
  title: string = "Editar Agenda"
  servId!:string;
  petId!:string;
  userId!:string;
  estabId!: string;
  dataHora!: string;

  constructor(
    private agendaService: AgendaService,
    private route: ActivatedRoute,
    private petService: PetsService,
    private usuarioService: UsuariosService,
    private serviceServices: ServiceService,
    public messageService:MessageService,
    private router:Router,

  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    let petResult, usuarioResult, servicoResult;
    this.agendaService.getAgenda(id).subscribe(agendaResult => {
      const agendaLoad = agendaResult.data;

      this.servId = agendaLoad.servico_id
      this.petId = agendaLoad.pet_id
      this.userId = agendaLoad.servico_id
      this.estabId = agendaLoad.estabelecimento_id
      this.dataHora = agendaLoad.data_hora


      petResult = this.petService.getPet(Number(agendaLoad.pet_id));
      usuarioResult = this.usuarioService.getUsuario(Number(agendaLoad.usuario_id));
      servicoResult = this.serviceServices.getServico(Number(agendaLoad.servico_id))
      forkJoin({
        pet: petResult,
        usuario: usuarioResult,
        servico: servicoResult,
      }).subscribe(results => {
        this.agenda = {
          ...agendaLoad,
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

    formData.append('dataHora', this.dataHora)
    formData.append('status', agendaData.status)
    formData.append("servico_id", this.servId)
    formData.append("usuario_id", this.petId)
    formData.append("funcionario_id", agendaData.funcionario_id)
    formData.append("pet_id", this.petId)
    formData.append("estabelecimento_id", this.estabId)

    this.agendaService.updateAgenda(id!, formData).subscribe((item:any)=>{
      
      this.messageService.add(item.message)
      this.router.navigate(['agenda'])
    })
     
  }



}
