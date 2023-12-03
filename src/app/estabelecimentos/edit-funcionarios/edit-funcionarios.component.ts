import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';

@Component({
  selector: 'app-edit-funcionarios',
  templateUrl: './edit-funcionarios.component.html',
  styleUrls: ['./edit-funcionarios.component.css']
})
export class EditFuncionariosComponent {

  funcionario!: Funcionario
  btnText: string = "Editar"
  title: string = "Editar Funcionario"
  @Input() id!: number
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private funcionarioService: FuncionarioService,
  ) { }

  ngOnInit(): void {
    this.funcionarioService.getFuncionario(this.id).subscribe(item => {
      this.funcionario = item.data;
    })
  }

  async editHandler(funcionarioData: Funcionario) {

    const id = this.funcionario.id
    const formData = new FormData()

    formData.append('nome', funcionarioData.nome)
    formData.append('email', funcionarioData.email)
    formData.append("funcao", funcionarioData.funcao)
    formData.append("foto", funcionarioData.foto)
    formData.append("cidade_id", funcionarioData.cidade_id)
    formData.append("password", funcionarioData.password!)

    this.funcionarioService.updateFuncionario(id!, formData)
      .subscribe(
        {
          next: (response: any) => {
            localStorage.setItem('message', response.message);
            window.location.reload();
            this.formularioEnviado.emit();
          },
          error: error => {
            console.log(error)
            window.alert(error.error.message);

          }
        }
      )
  }

}
