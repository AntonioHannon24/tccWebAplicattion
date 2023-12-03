import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { Usuario } from 'src/app/interfaces/Usuario';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  usuario!:Usuario
  btnText:string = "Editar"
  title:string = "Editar usuário"
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();
  @Input() id!:number

  constructor(
    private usuarioService:UsuariosService,
  ) { }

  ngOnInit(): void {

   
    this.usuarioService.getUsuario(this.id).subscribe(item=>{
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
    
    this.usuarioService.updateUsuario(id!,formData)
    .subscribe(
      {
        next: (response: any) => {
          localStorage.setItem('message', response.message);
          window.location.reload();
          this.formularioEnviado.emit();
        },
        error: error => {
          og(error)
          window.alert(error.error.message);

        }
      }
    )

  }
  
}
