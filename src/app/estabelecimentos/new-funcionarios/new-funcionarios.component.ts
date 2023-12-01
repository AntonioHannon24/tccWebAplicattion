import { Component, EventEmitter, Output } from '@angular/core';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';


@Component({
  selector: 'app-new-funcionarios',
  templateUrl: './new-funcionarios.component.html',
  styleUrls: ['./new-funcionarios.component.css']
})
export class NewFuncionariosComponent {

  title: string = "Novo Funcionario"
  btnText: string = 'Criar'
  id!: number
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private funcionarioService: FuncionarioService,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.id = Number(localStorage.getItem('id'))
  }

  async createHandle(funcionario: Funcionario) {

    const formData = new FormData();

    formData.append("id", funcionario.id)

    formData.append("nome", funcionario.nome)
    formData.append("email", funcionario.email)
    formData.append("foto", funcionario.foto)
    formData.append("funcao", funcionario.funcao)
    formData.append("estabelecimento_id", funcionario.estabelecimento_id)
    formData.append("cidade_id", funcionario.cidade_id)
    formData.append("password", funcionario.password!)

    this.funcionarioService.createFuncionario(formData)
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
