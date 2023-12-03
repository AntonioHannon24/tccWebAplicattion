import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';


@Component({
  selector: 'app-edit-estabelecimento',
  templateUrl: './edit-estabelecimento.component.html',
  styleUrls: ['./edit-estabelecimento.component.css']
})

export class EditEstabelecimentoComponent implements OnInit {

  estabelecimento!: Estabelecimento
  btnText: string = "Editar"
  title: string = "Edite seu Estabelecimento"
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();
  @Input() id!: number

  constructor(
    private estabelecimentoService: EstabelecimentoService,

  ) { }

  ngOnInit(): void {

    const idStore = localStorage.getItem('id')
    const tipo = localStorage.getItem('tipo')
    if (tipo == "Admin") {
      this.estabelecimentoService.getEstabelecimento(Number(this.id)).subscribe(item => {
        this.estabelecimento = item.data;
      })
    } else {
      this.estabelecimentoService.getEstabelecimento(Number(idStore)).subscribe(item => {
        this.estabelecimento = item.data;
      })
    }

  }

  async editHandler(estabelecimento: Estabelecimento) {

    const id = this.estabelecimento.id
    const formData = new FormData();

    formData.append("nome", estabelecimento.nome)
    formData.append("cnpj", estabelecimento.cnpj)
    formData.append("endereco", estabelecimento.endereco)
    formData.append("telefone", estabelecimento.telefone)
    formData.append("logo", estabelecimento.logo)
    formData.append("cep", estabelecimento.cep)
    formData.append("email", estabelecimento.email)
    formData.append("cidadeId", estabelecimento.cidade_id)
    formData.append("password", estabelecimento.password)

    this.estabelecimentoService.updateEstab(id!, formData)
      .subscribe(
        {
          next: (response: any) => {
            localStorage.setItem('message', response.message);
            window.location.reload();
            this.formularioEnviado.emit();
          },
          error: error => {
            window.alert(error.error.message);

          }
        }
      )

  }

}
