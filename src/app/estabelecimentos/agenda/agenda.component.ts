import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { AgendaService } from 'src/app/Services/agenda/agenda.service';
import { Agenda } from 'src/app/interfaces/Agenda';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @ViewChild('myModal') myModal: any; 

  constructor(public agendaService: AgendaService,
              private authService: AuthService,
              private modalService: BsModalService) {}

  selected: Date | null | undefined;
  modalRef!: BsModalRef<any>;
  id: any;

  ngOnInit(): void {
    this.authService._id.subscribe((valor) => {
      this.id = valor;
      console.log(this.id);
    });
    this.agendaService.getAgendaEstabelecimento(this.id).subscribe((valor) => {
      console.log(valor.data);
    });
  }

  dataSelecionada(event: any): void {
    this.modalRef = this.modalService.show(this.myModal);
  }

  fecharModal(): void {
    this.modalRef.hide();
  }
}