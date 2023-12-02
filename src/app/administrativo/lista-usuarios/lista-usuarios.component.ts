import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuariosService } from 'src/app/Services/usuarios/usuarios.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



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
  modalRef!: BsModalRef<any>
  @ViewChild('myModal') myModal: any;
  userId!: number;

  constructor(
    private usuarioService: UsuariosService,
    public messageService: MessageService,
    private router: Router,
    private modalService: BsModalService,

  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')

    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }

    this.usuarioService.getAllUsuarios().subscribe((items) => {
      const data = items.data
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-BR')
      })

      data.forEach((item)=>{
        item.status == 1 ? item.status = "Ativo" : item.status = "Desativado"
        this.usuarios.push(item)
      })
      this.allUsers = data
      this.usuarios = data
    })

  }

  async desativarEstabelecimento(servId: number) {
    this.usuarioService.desativarUsuario(servId).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })
  }
  async ativarEstabelecimento(idServ: number) {

    await this.usuarioService.ativarUsuario(idServ).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })

  }
  editar(id: number) {
    this.userId = id
    this.modalRef = this.modalService.show(this.myModal, { class: 'modal-lg' })
  }
  fecharModal(): void {
    this.modalRef.hide();
  }

}
