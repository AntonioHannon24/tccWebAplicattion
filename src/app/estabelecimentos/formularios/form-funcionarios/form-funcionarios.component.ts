import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-funcionarios',
  templateUrl: './form-funcionarios.component.html',
  styleUrls: ['./form-funcionarios.component.css']
})
export class FormFuncionariosComponent {


  @Output() onSubmit = new EventEmitter<Funcionario>()
  @Input() btnText!: string
  @Input() title!: string
  @Input() funcionarioData: Funcionario | null = null;
  @Input() id!: number

  baseApiUrl = environment.baseApiUrl
  funcionarioForm!: FormGroup;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {

    this.funcionarioForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(this.funcionarioData ? this.funcionarioData.nome : ''),
      email: new FormControl(this.funcionarioData ? this.funcionarioData.email : ''),
      funcao: new FormControl(this.funcionarioData ? this.funcionarioData.funcao : ''),
      cidade_id: new FormControl(this.funcionarioData ? this.funcionarioData.cidade_id : ''),
      password:new FormControl(this.funcionarioData ? this.funcionarioData.password: ''),
      password2: new FormControl(),
      foto: new FormControl(''),

      estabelecimento_id: new FormControl(this.id),

    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.funcionarioForm.patchValue({ foto: file })

  }

  submit() {

    if (this.funcionarioForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.funcionarioForm.value)
  }

  voltar() {
    this.location.back()
  }

  conferir() {
    const senha = this.funcionarioForm.get('password')!.value;
    const confirmarSenha = this.funcionarioForm.get('password2')!.value;
    if (senha === confirmarSenha) {
      return true
    } else {
      return false
    }
  }


  get nome() {
    return this.funcionarioForm.get('nome')!;
  }

  get funcao() {
    return this.funcionarioForm.get('funcao')!;
  }
  get email() {
    return this.funcionarioForm.get('email')!;
  }
  get cidade_id() {
    return this.funcionarioForm.get('cidade_id')!;
  }

}
