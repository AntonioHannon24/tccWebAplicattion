import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resposta } from 'src/app/interfaces/Resposta';

@Component({
  selector: 'app-resposta-contato',
  templateUrl: './resposta-contato.component.html',
  styleUrls: ['./resposta-contato.component.css']
})
export class RespostaContatoComponent implements OnInit {


  respostaForm!: FormGroup;
  @Output() onSubmit = new EventEmitter<Resposta>()
  @Input() assunto!: string
  @Input() email!: string


  ngOnInit(): void {
    this.respostaForm = new FormGroup({
      email: new FormControl(this.email ? this.email : ''),
      assunto: new FormControl(this.assunto ? this.assunto : ''),
      mensagemResposta: new FormControl("", [Validators.required]),
    })
  }

  submit() {
    if (this.respostaForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.respostaForm.value)
  }

  get mensagemResposta() {
    return this.respostaForm.get('mensagemResposta')!;
  }

}
