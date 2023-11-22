import { Component, EventEmitter, Output } from '@angular/core';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';

@Component({
  selector: 'app-edit-funcionarios',
  templateUrl: './edit-funcionarios.component.html',
  styleUrls: ['./edit-funcionarios.component.css']
})
export class EditFuncionariosComponent {



  funcionario!:Funcionario
  btnText:string = "Editar"
  title:string = "Editar Funcionario"
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private funcionarioService:FuncionarioService,
  ) { }

  ngOnInit(): void {

    const id = Number(localStorage.getItem('id'))

    this.funcionarioService.getFuncionario(id).subscribe(item=>{
      this.funcionario = item.data;
    })
  }
  async editHandler(funcionarioData:Funcionario){

    const id = this.funcionario.id

    const formData = new FormData()

    formData.append('nome',funcionarioData.nome)
    formData.append('email',funcionarioData.email)
    formData.append("funcao",funcionarioData.funcao)
    formData.append("foto",funcionarioData.foto)
    formData.append("cidade_id",funcionarioData.cidade_id)
    formData.append("password",funcionarioData.password!)

    await this.funcionarioService.updateFuncionario(id!,formData).subscribe(()=>{
      localStorage.setItem('message', "Funcionário editado com sucesso!!")
      window.location.reload()
      this.formularioEnviado.emit();
    })
  }

}
