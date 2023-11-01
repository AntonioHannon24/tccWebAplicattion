import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.component.html',
  styleUrls: ['./lista-funcionarios.component.css']
})
export class ListaFuncionariosComponent implements OnInit{


  estabelecimento?: Estabelecimento;
  baseApiUrl = environment.baseApiUrl;
  id!:number;
  p: number = 1;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService,
    private funcionarioService: FuncionarioService,

    private location: Location
  ) { }

  ngOnInit(): void {


    this.id = Number(this.route.snapshot.paramMap.get('id'))

    this.estabelecimentoService.getEstabelecimento(this.id).subscribe(item => {
      this.estabelecimento = item.data;
    });
  }

  async removeFuncionario(idFuncNumber: number) {
    await this.funcionarioService.removeFuncionario(idFuncNumber).subscribe(() => {
      window.location.reload();
    })

  }

  async editFuncionario(idFuncNumber: number) {
    this.router.navigate(["edit-funcionarios/" + idFuncNumber])
  }
  voltar() {
    this.location.back()
  }
}

