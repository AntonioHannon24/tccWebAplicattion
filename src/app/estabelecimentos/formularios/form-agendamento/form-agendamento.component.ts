import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agenda } from 'src/app/interfaces/Agenda';

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

  constructor() { }

  ngOnInit(): void {
    this.agendaForm = new FormGroup({
      id: new FormControl(this.agendaData ? this.agendaData.id :'', [Validators.required]),
      data_hora: new FormControl(this.agendaData ? this.agendaData.data_hora :'', [Validators.required]),
      status: new FormControl(this.agendaData ? this.agendaData.status :'', [Validators.required]),
      servico_id: new FormControl(this.agendaData ? this.agendaData.servico_id :'', [Validators.required]),
      usuario_id: new FormControl(this.agendaData ? this.agendaData.usuario_id :'', [Validators.required]),
      estabelecimento_id: new FormControl(this.agendaData ? this.agendaData.estabelecimento_id :'', [Validators.required]),
      funcionario_id: new FormControl(this.agendaData ? this.agendaData.funcionario_id :'', [Validators.required]),
      pet_id: new FormControl(this.agendaData ? this.agendaData.pet_id :'', [Validators.required]),
  
    })

  }

  async submit() {
    if (this.agendaForm.invalid) {
      return;
    }
    const formData = new FormData();

    formData.append("id", this.agendaForm.get('id')?.value)
    formData.append("data_hora", this.agendaForm.get('data_hora')?.value)
    formData.append("status", this.agendaForm.get('status')?.value)
    formData.append("servico_id", this.agendaForm.get('servico_id')?.value);
    formData.append("usuario_id", this.agendaForm.get('usuario_id')?.value);
    formData.append("funcionario_id", this.agendaForm.get('funcionario_id')?.value)
    formData.append("pet_id", this.agendaForm.get('pet_id')?.value)
    this.onSubmit.emit(this.agendaForm.value)
  }


  get status() {
    return this.agendaForm.get('status')!;
  }

  get funcionario_id() {
    return this.agendaForm.get('funcionario_id')!;
  }

}
