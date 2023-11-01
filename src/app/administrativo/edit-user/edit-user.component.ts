import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { Usuario } from 'src/app/interfaces/Usuario';

import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{


  usuario!:Usuario
  btnText:string = "Editar"
  title:string = "Editar usuário"

  constructor(
    private usuarioService:UsuariosService,
    private route:ActivatedRoute,
    private message:MessageService,
    private router:Router,
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.usuarioService.getUsuario(id).subscribe(item=>{
      this.usuario = item.data;
    })
  }
  async editHandler(usuarioData:Usuario){
    
    
    const id = this.usuario.id
    const formData = new FormData()
    formData.append("nome",usuarioData.nome)
    formData.append("email",usuarioData.email)
    formData.append("cpf",usuarioData.cpf)
    formData.append("password",usuarioData.password)
    formData.append("cidade_id",usuarioData.cidade_id)
    
    await this.usuarioService.updateUsuario(id!,formData).subscribe(()=>{this.goHome()})
    
  }
  goHome(){
    this.router.navigate(['/'])
    this.message.add("O usuário foi editado com sucesso!!")
  }

}
