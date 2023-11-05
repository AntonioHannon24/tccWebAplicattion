import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contato } from 'src/app/interfaces/Contato';


@Component({
  selector: 'app-form-contatos',
  templateUrl: './form-contatos.component.html',
  styleUrls: ['./form-contatos.component.css']
})
export class FormContatosComponent {


  contatoForm!: FormGroup;

  @Output() onSubmit = new EventEmitter<Contato>()
  @Input() btnText!: string
  @Input() title!: string
  @Input() contatoData: Contato | null = null;

  estado:string = ""
  opcaoSelecionada:string = ""
  
  constructor() { }

  ngOnInit(): void {
    this.contatoForm = new FormGroup({
      nome: new FormControl(this.contatoData ? this.contatoData.nome :'', [Validators.required]),
      email: new FormControl(this.contatoData ? this.contatoData.email :'', [Validators.required]),
      assunto: new FormControl(this.contatoData ? this.contatoData.assunto :'', [Validators.required]),
      mensagem: new FormControl(this.contatoData ? this.contatoData.mensagem :'', [Validators.required]),
      estado: new FormControl(''),
    })

    this.estado= this.contatoData?.estado == "1" ? "Novo" : ""
    this.opcaoSelecionada = "1"
  }

  async submit() {
    if (this.contatoForm.invalid) {
      return;
    }
    const formData = new FormData();

    formData.append("nome", this.contatoForm.get('nome')?.value)
    formData.append("email", this.contatoForm.get('email')?.value)
    formData.append("assunto", this.contatoForm.get('assunto')?.value)
    formData.append("mensagem", this.contatoForm.get('mensagem')?.value);
    formData.append("estado", this.contatoForm.get('estado')?.value);
    this.onSubmit.emit(this.contatoForm.value)
  }


  get nome() {
    return this.contatoForm.get('nome')!;
  }
  get email() {
    return this.contatoForm.get('email')!;
  }
  get assunto() {
    return this.contatoForm.get('assunto')!;
  }
  get mensagem() {
    return this.contatoForm.get('mensagem')!;
  }

}
