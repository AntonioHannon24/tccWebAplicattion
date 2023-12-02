import { Component, ViewChild } from '@angular/core';
import { EstabelecimentoService } from 'src/app/Services/Estabelecimentos/estabelecimento.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { environment } from 'src/environments/environment';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'src/app/Services/MessageServices/message.service';


@Component({
  selector: 'app-seu-estabelecimento',
  templateUrl: './seu-estabelecimento.component.html',
  styleUrls: ['./seu-estabelecimento.component.css']
})
export class SeuEstabelecimentoComponent {
  estabelecimento?:Estabelecimento
  
  baseApiUrl = environment.baseApiUrl;
  id!:number
  @ViewChild('myModal') myModal:any;
  modalRef!:BsModalRef<any>
  
  constructor(
    private estabelecimentoService:EstabelecimentoService,
    private authService:AuthService,
    private modalService:BsModalService,
    private messageService:MessageService,
    
  ) { }

  ngOnInit(): void {

    const mensagem = localStorage.getItem('message')
    if (mensagem) { this.messageService.add(mensagem); localStorage.removeItem('message'); }

    

    this.authService._id.subscribe((valor: any | undefined)=>{
      this.id = valor;
    })

    this.estabelecimentoService.getEstabelecimento(this.id!).subscribe((item: { data: Estabelecimento | any; })=>{
      this.estabelecimento = item.data;
    })
  
  }
  editar(){
    this.modalRef = this.modalService.show(this.myModal,{class:'modal-lg'})
  }


  fecharModal(): void {
    this.modalRef.hide();
  }
}
