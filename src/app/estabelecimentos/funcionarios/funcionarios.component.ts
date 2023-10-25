import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { FuncionarioService } from 'src/app/Services/funcionario/funcionario.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {


  estabelecimento?: Estabelecimento;
  baseApiUrl = environment.baseApiUrl;
  idEstab!: any;
  p: number = 1;

  constructor(
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {


    this.authService._id.subscribe(valor => {
      this.idEstab = valor;
    });

    this.estabelecimentoService.getEstabelecimento(this.idEstab).subscribe(item => {
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
