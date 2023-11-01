import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{



  baseApiUrl = environment.baseApiUrl
  allEstabs:Estabelecimento[] = []
  estabelecimentos:Estabelecimento [] = [];
  userId?:any
  p:number = 1;


  constructor(
    private estabelecimentoService:EstabelecimentoService,
    private router:Router,
    public messageService:MessageService,
  ) { }

  ngOnInit(): void {



    this.estabelecimentoService.getAllEstabelecimentos().subscribe((items)=>{
      const data = items.data
      data.map((items)=>{
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-br')
      })
      this.allEstabs = data
      this.estabelecimentos = data
    })
  }

  async removeEstab(id:number){
    await this.estabelecimentoService.removeEstab(id).subscribe()
    this.router.navigate(['']).then(()=>{
      this.messageService.add('Estabelecimento deletado com sucesso!!')
    })
  }
  editar(id:number){
    this.router.navigate([`/edit-estabelecimentos/${id}`])
  }
  listaFuncionarios(id:number){
    this.router.navigate([`/lista-funcionarios/${id}`])
  }

}

