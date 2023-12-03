import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Servicos } from 'src/app/interfaces/Servicos';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-servicos',
  templateUrl: './form-servicos.component.html',
  styleUrls: ['./form-servicos.component.css']
})
export class FormServicosComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Servicos>()
  @Input() btnText!: string
  @Input() title!: string
  @Input() servicoData: Servicos | null = null;
  @Input() id!: number
  baseApiUrl = environment.baseApiUrl
  servicosForm!: FormGroup;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
    this.servicosForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(this.servicoData ? this.servicoData.nome : ''),
      valor: new FormControl(this.servicoData ? this.servicoData.valor : ''),
      descricao: new FormControl(this.servicoData ? this.servicoData.descricao : ''),
      estabelecimento_id: new FormControl(this.id),
    })
  }

  submit() {

    if (this.servicosForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.servicosForm.value)
  }

  voltar() {
    this.location.back()
  }

  get nome() {
    return this.servicosForm.get('nome')!;
  }

  get valor() {
    return this.servicosForm.get('valor')!;
  }

  get descricao() {
    return this.servicosForm.get('descricao')!;
  }


}
