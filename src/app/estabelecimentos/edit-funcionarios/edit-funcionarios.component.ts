import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-funcionarios',
  templateUrl: './edit-funcionarios.component.html',
  styleUrls: ['./edit-funcionarios.component.css']
})
export class EditFuncionariosComponent {



  funcionario!:Funcionario
  btnText:string = "Editar"
  title:string = "Editar Funcionario"


  constructor(
    private funcionarioService:FuncionarioService,
    private route:ActivatedRoute,
    private message:MessageService,
    private router:Router,
    private location:Location

  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))


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
    formData.append("password",funcionarioData.password)

   
    await this.funcionarioService.updateFuncionario(id!,formData).subscribe(()=>{this.goHome()})
  }
  goHome(){
    this.voltar()
    this.message.add("Funcionario editado com sucesso!!")
  }
  voltar(){
    this.location.back()
  }

  

}
