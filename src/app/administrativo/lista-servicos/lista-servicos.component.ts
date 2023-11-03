import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ServiceService } from 'src/app/Services/service/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-servicos',
  templateUrl: './lista-servicos.component.html',
  styleUrls: ['./lista-servicos.component.css']
})
export class ListaServicosComponent implements OnInit{


  estabelecimento?: Estabelecimento;
  usuarioId?: number;
  baseApiUrl = environment.baseApiUrl;
  idEstab!: number;
  p: number = 1;

  constructor(
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    private route:ActivatedRoute,
    private servicoService: ServiceService,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.idEstab = Number(this.route.snapshot.paramMap.get('id'))

    this.estabelecimentoService.getEstabelecimento(this.idEstab).subscribe(item => {
      this.estabelecimento = item.data;
    });
  }
  async removeServico(servicoId: number) {
    await this.servicoService.removeServico(servicoId).subscribe(() => {
      window.location.reload();
    });
  }
  editServico(servicoId: number) {
    this.router.navigate(["/edit-servicos/" + servicoId])
  };
  voltar() {
    this.location.back()
  }
}
