import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-funcionarios',
  templateUrl: './new-funcionarios.component.html',
  styleUrls: ['./new-funcionarios.component.css']
})
export class NewFuncionariosComponent {

  title:string = "Novo Funcionario"
  btnText:string = 'Criar'
  id!:number


  constructor(
    private funcionarioService:FuncionarioService,
    private router:ActivatedRoute,
    public messageService:MessageService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'))
  }

  async createHandle(funcionario:Funcionario){
    
    const formData = new FormData();

    formData.append("id",funcionario.id)

    formData.append("nome",funcionario.nome)
    formData.append("email",funcionario.email)
    formData.append("foto",funcionario.foto)
    formData.append("funcao",funcionario.funcao)
    formData.append("estabelecimento_id",funcionario.estabelecimento_id)
    formData.append("cidade_id",funcionario.cidade_id)
    formData.append("password",funcionario.password)
    await this.funcionarioService.createFuncionario(formData).subscribe(()=>{this.message();this.voltar()})
  }

  message():void{
    this.messageService.add('Funcionario criado com sucesso!!')
  }
  voltar(){
    this.location.back()
  }

}
