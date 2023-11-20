import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Funcionario } from 'src/app/interfaces/Funcionario';
import { MessageService } from 'src/app/Services/MessageServices/message.service';

@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.component.html',
  styleUrls: ['./lista-funcionarios.component.css']
})
export class ListaFuncionariosComponent implements OnInit {


  estabelecimento?: Estabelecimento;
  baseApiUrl = environment.baseApiUrl;
  id!: number;
  p: number = 1;
  funcionarios: Funcionario[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService,
    private funcionarioService: FuncionarioService,
    private messageService:MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')
    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }

    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.estabelecimentoService.getEstabelecimento(this.id).subscribe(item => {
      const teste = item.data.funcionario
      teste?.forEach((item) => {
        item.status == 1 ? item.status = "Ativo" : item.status = "Desativado"
        this.funcionarios.push(item)
      })
    });
  }

  async desativarFuncionario(idFuncNumber: number) {
    await this.funcionarioService.desativarFuncionario(idFuncNumber).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })

  }
  async ativarFuncionario(idFuncNumber: number) {
    await this.funcionarioService.ativarFuncionario(idFuncNumber).subscribe((item: any) => {
      localStorage.setItem('message', item.msg)
      window.location.reload()
    })

  }

  async editFuncionario(idFuncNumber: number) {
    this.router.navigate(["edit-funcionarios/" + idFuncNumber])
  }

  voltar() {
    this.location.back()
  }

}

