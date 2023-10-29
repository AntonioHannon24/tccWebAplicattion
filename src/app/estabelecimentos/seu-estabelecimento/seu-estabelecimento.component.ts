import { Component } from '@angular/core';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { environment } from 'src/environments/environment';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';

@Component({
  selector: 'app-seu-estabelecimento',
  templateUrl: './seu-estabelecimento.component.html',
  styleUrls: ['./seu-estabelecimento.component.css']
})
export class SeuEstabelecimentoComponent {
  estabelecimento?:Estabelecimento
  
  baseApiUrl = environment.baseApiUrl;
  id!:number
 
  
  constructor(
    private estabelecimentoService:EstabelecimentoService,
    private authService:AuthService,
    
  ) { }

  ngOnInit(): void {
    

    this.authService._id.subscribe((valor: any | undefined)=>{
      this.id = valor;
    })

    this.estabelecimentoService.getEstabelecimento(this.id!).subscribe((item: { data: Estabelecimento | any; })=>{
      this.estabelecimento = item.data;
    })
  
  }



}
