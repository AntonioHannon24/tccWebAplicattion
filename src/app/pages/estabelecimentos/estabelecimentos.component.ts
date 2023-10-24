import { Component, OnInit } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { environment } from 'src/environments/environment';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.css']
})
export class EstabelecimentosComponent implements OnInit{

  
  allEstabs: Estabelecimento[] = []
  estabelecimentos: Estabelecimento[] = [];
  baseApiUrl = environment.baseApiUrl;
  p:number = 1;

  constructor(
    private estabelecimentoService: EstabelecimentoService
  ) { }

  ngOnInit(): void {
    this.estabelecimentoService.getAllEstabelecimentos().subscribe((items) => {
      const data = items.data
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-br')
      })
      this.allEstabs = data
      this.estabelecimentos = data
    })
  }

  search(event: Event): void {

    const target = event.target as HTMLInputElement
    const value = target.value

    this.estabelecimentos = this.allEstabs.filter((estab) => 
      estab.nome.toLocaleLowerCase().includes(value)
    )

  }

}
