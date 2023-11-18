import { Component } from '@angular/core';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ServiceService } from 'src/app/Services/service/service.service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/Services/MessageServices/message.service';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent {

  estabelecimento?: Estabelecimento;
  usuarioId?: number;
  baseApiUrl = environment.baseApiUrl;
  idEstab!: any
  p: number = 1;

  constructor(
    private router: Router,
    private estabelecimentoService: EstabelecimentoService,
    private authService: AuthService,
    private servicoService: ServiceService,
    private location: Location,
    private messageService:MessageService,
    
  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')

    if(mensagem){this.messageService.add(mensagem); localStorage.removeItem('message');}



    this.authService._id.subscribe(valor => {
      this.idEstab = valor;
    });
    this.estabelecimentoService.getEstabelecimento(this.idEstab).subscribe(item => {
      this.estabelecimento = item.data;
    });
  }
  async removeServico(servicoId: number) {
    await this.servicoService.removeServico(servicoId).subscribe((item:any) => {
     
     localStorage.setItem('message',item.message) 
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
