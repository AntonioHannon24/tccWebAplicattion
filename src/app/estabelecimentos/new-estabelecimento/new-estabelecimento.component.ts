import { Component, OnInit, Output } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-estabelecimento',
  templateUrl: './new-estabelecimento.component.html',
  styleUrls: ['./new-estabelecimento.component.css']
})
export class NewEstabelecimentoComponent implements OnInit {


  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();
  title: string = "Novo Petshop"
  btnText: string = "Novo Estabelecimento"

  constructor(
    private estabelecimentoService: EstabelecimentoService,
  ) { }
  ngOnInit(): void { }

  async createHandle(estabelecimento: Estabelecimento) {
    
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
    if (estabelecimento.logo) {
      formData.append("logo", estabelecimento.logo)
    }
    this.estabelecimentoService.createEstab(formData)
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


