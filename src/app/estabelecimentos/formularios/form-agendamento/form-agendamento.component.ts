import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { Agenda } from 'src/app/interfaces/Agenda';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-agendamento',
  templateUrl: './form-agendamento.component.html',
  styleUrls: ['./form-agendamento.component.css']
})
export class FormAgendamentoComponent {

  agendaForm!: FormGroup;

  @Output() onSubmit = new EventEmitter<Agenda>()
  @Input() btnText!: string
  @Input() title!: string
  @Input() agendaData: Agenda | null = null;

  opcaoSelecionadaStatus: string = ""
  statusInit!: number
  funcionarios: Funcionario[] = []

  constructor(
    private funcionariosService: FuncionarioService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.funcionariosService.funcionariosEstab(Number(this.agendaData?.estabelecimento_id)).subscribe((item) => {
      this.funcionarios = item.data
    })

    this.agendaForm = new FormGroup({
      id: new FormControl(this.agendaData ? this.agendaData.id : '', [Validators.required]),
      data_hora: new FormControl(this.agendaData ? this.agendaData.data_hora : '', [Validators.required]),
      status: new FormControl(this.agendaData ? this.agendaData.status : '', [Validators.required]),
      servico_id: new FormControl(this.agendaData ? this.agendaData.servico_id : '', [Validators.required]),
      usuario_id: new FormControl(this.agendaData ? this.agendaData.usuario_id : '', [Validators.required]),
      estabelecimento_id: new FormControl(this.agendaData ? this.agendaData.estabelecimento_id : '', [Validators.required]),
      funcionario_id: new FormControl(this.agendaData ? this.agendaData.funcionario_id : '', [Validators.required]),
      pet_id: new FormControl(this.agendaData ? this.agendaData.pet_id : '', [Validators.required]),

    })

    this.statusInit == 1 ? " Novo " : ""



  }

  async submit() {
    if (this.agendaForm.invalid) {
      return;
    }
    const formData = new FormData();



    formData.append("status", this.agendaForm.get('status')?.value)


    formData.append("funcionario_id", this.agendaForm.get('funcionario_id')?.value)



    this.onSubmit.emit(this.agendaForm.value)
  }


  get status() {
    return this.agendaForm.get('status')!;
  }

  get funcionario_id() {
    return this.agendaForm.get('funcionario_id')!;
  }
  voltar() {
    this.location.back()
  }


}
