import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';



@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {


  baseApiUrl = environment.baseApiUrl
  allUsers: Usuario[] = []
  usuarios: Usuario[] = []
  p: number = 1;

  constructor(
    private usuarioService: UsuariosService,
    public messageService: MessageService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.usuarioService.getAllUsuarios().subscribe((items) => {
      const data = items.data
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-BR')
      })
      this.allUsers = data
      this.usuarios = data
    })

  }

  async removeUser(id: number) {
    await this.usuarioService.removeUser(id).subscribe();
    this.router.navigate(['']);
    this.messageService.add('Usuário deletado com sucesso!!')

  }
  editar(id: number) {
    this.router.navigate([`edit-usuario/${id}`])
  }


}
