import { Component, OnInit, ViewChild } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { environment } from 'src/environments/environment';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CidadeService } from 'src/app/Services/cidade/cidade.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.css']
})

export class EstabelecimentosComponent implements OnInit {
  
  @ViewChild('myModal') myModal: any;
  modalRef!: BsModalRef;
  allEstabs: Estabelecimento[] = []
  estabelecimentos: Estabelecimento[] = [];
  estabelecimento!: Estabelecimento
  baseApiUrl = environment.baseApiUrl;
  p: number = 1;

  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private modalService: BsModalService,
    private cidadeService: CidadeService,
  ) { }

  ngOnInit(): void {
    this.estabelecimentoService.allEstabelecimentoSemLogar().subscribe((items) => {
      const data = items.data
      console.log(items)
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-br')
      })
      this.estabelecimentos = data
      this.allEstabs = data
    })
  }

  search(event: Event): void {

    const target = event.target as HTMLInputElement
    const value = target.value
    this.estabelecimentos = this.allEstabs.filter((estab) =>
      estab.nome.toLocaleLowerCase().includes(value)
    )
  }

  fecharModal = () => {
    this.modalRef.hide()
  }

  abrirModal = (id: number) => {
    this.estabelecimentoService.getEstabelecimento(id).subscribe((item) => {
      const estabelecimentoLoad = item.data
      let cidadeResult = this.cidadeService.getCidade(estabelecimentoLoad.cidade_id)
      forkJoin({
        cidade: cidadeResult
      }).subscribe(results => {
        this.estabelecimento = {
          ...estabelecimentoLoad,
          cidade_id: results.cidade.data.nome
        }
        this.modalRef = this.modalService.show(this.myModal, { class: 'modal-lg' })
      })
    })
  }

}
