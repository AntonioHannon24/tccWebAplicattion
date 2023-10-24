import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';
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
    private route:ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    private location:Location
    
  ) { }

  ngOnInit(): void {
    

    this.authService._id.subscribe((valor: any | undefined)=>{
      this.id = valor;
    })

    this.estabelecimentoService.getEstabelecimento(this.id!).subscribe((item: { data: Estabelecimento | any; })=>{
      this.estabelecimento = item.data;
    })
  
  }
  voltar(){
    this.location.back()
  }

  adminFunc(){
    const idRoute = "admin-funcionarios/"+this.estabelecimento?.id;
    this.router.navigate([idRoute])
  }
  adminServ(){
    const idRoute = "admin-servicos/"+this.estabelecimento?.id;

    this.router.navigate([idRoute])
  }
  adminAgenda(){
    const idRoute = "admin-agenda/"+this.estabelecimento?.id;

    this.router.navigate([idRoute])
  }




}
