import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {


  contatoForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {


    this.contatoForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      assunto: new FormControl('', [Validators.required]),
      mensagem: new FormControl('', [Validators.required]),
    })
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
