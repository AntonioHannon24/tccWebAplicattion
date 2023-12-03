import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contato } from 'src/app/interfaces/Contato';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from 'src/app/Services/contato/contato.service';

@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.css']
})
export class FormContatosComponent {


  contatoForm!: FormGroup;
  respostaForm!: FormGroup
  @Input() btnText!: string
  @Input() title!: string
  @Input() contatoData: Contato | null = null;
  @ViewChild('myModal') myModal: any;
  modalRef!: BsModalRef<any>
  estado: string = ""
  opcaoSelecionada: string = ""
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();
  assunt!: string
  emai!: string
  id!: number

  constructor(
    private location: Location,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private contatoService: ContatoService
  ) { }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'))

    this.contatoForm = new FormGroup({
      nome: new FormControl(this.contatoData ? this.contatoData.nome : '', [Validators.required]),
      email: new FormControl(this.contatoData ? this.contatoData.email : '', [Validators.required]),
      assunto: new FormControl(this.contatoData ? this.contatoData.assunto : '', [Validators.required]),
      mensagem: new FormControl(this.contatoData ? this.contatoData.mensagem : '', [Validators.required]),
      estado: new FormControl(''),
    })
    this.estado = this.contatoData?.estado == "1" ? "Novo" : ""
    this.opcaoSelecionada = "1"
  }

  fecharModal(): void {
    this.modalRef.hide();
  }

  responder() {
    this.modalRef = this.modalService.show(this.myModal, { class: 'modal-lg' })
    this.assunt = this.contatoData!.assunto
    this.emai = this.contatoData!.email
  }

  get assunto(){
    return this.contatoForm.get('assunto')!;
  }

  botaoVoltar() {
    this.location.back()
  }

  async editHandler(contato: any) {

    const formData = new FormData()
    formData.append("email", contato.email)
    formData.append("assunto", contato.assunto)
    formData.append("mensagemResposta", contato.mensagemResposta)

    this.contatoService.resposta(this.id, formData)
      .subscribe(
        {
          next: (response: any) => {
            this.fecharModal();
            localStorage.setItem('message', response.message);
            this.router.navigate(['lista-contatos'])
            this.formularioEnviado.emit();
          },
          error: error => {

            window.alert(error.error.message);

          }
        }
      )

  }

}
