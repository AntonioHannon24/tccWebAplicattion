import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';


@Component({
  selector: 'app-new-estabelecimento',
  templateUrl: './new-estabelecimento.component.html',
  styleUrls: ['./new-estabelecimento.component.css']
})
export class NewEstabelecimentoComponent  implements OnInit{



  title: string = "Novo Petshop"
  btnText: string = "Go"
  id!: Number


  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private route: Router,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.router.snapshot.paramMap.get('id'))
  }

  async createHandle(estabelecimento: Estabelecimento) {
    const formData = new FormData();

    formData.append("nome",estabelecimento.nome)
    formData.append("cnpj",estabelecimento.cnpj)
    formData.append("endereco",estabelecimento.endereco)
    formData.append("telefone",estabelecimento.telefone)
    formData.append("logo",estabelecimento.logo)
    formData.append("cep",estabelecimento.cep)
    formData.append("email",estabelecimento.email)
    formData.append("cidadeId",estabelecimento.cidade_id)
    
    if (estabelecimento.logo) {
      formData.append("logo", estabelecimento.logo)
    }



    await this.estabelecimentoService.createEstab(formData).subscribe(() => { this.goHome()})
  }

  goHome() {
    this.route.navigate(['']).then(() => {
      this.messageService.add("Estabelecimento criado com sucesso!!")
    }
    )

  }

}
