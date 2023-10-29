import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { CidadeService } from 'src/app/Services/cidade/cidade.service';
import { Cidade } from 'src/app/interfaces/Cidade';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-estabelecimento',
  templateUrl: './form-estabelecimento.component.html',
  styleUrls: ['./form-estabelecimento.component.css']
})
export class FormEstabelecimentoComponent {


  @Output() onSubmit = new EventEmitter<Estabelecimento>()
  @Input() title!: string
  @Input() btnText!: string
  @Input() estabdata: Estabelecimento | null = null;
  @Input() id!: Number

  estabForm!: FormGroup

  allCidades: Cidade[] = []
  cidades: Cidade[] = []
 


  constructor(
    private cidadeService: CidadeService,
    private location:Location

  ) { }

  ngOnInit(): void {
    console.log(this.estabdata)

    this.cidadeService.getAllCidades().subscribe((items) => {
      const data = items.data
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-BR')
      })
      this.allCidades = data
      this.cidades = data
    })

    this.estabForm = new FormGroup({

      id: new FormControl(Validators),
      nome: new FormControl(this.estabdata ? this.estabdata.nome : '', [Validators.required]),
      cnpj: new FormControl(this.estabdata ? this.estabdata.cnpj : '', [Validators.required]),
      endereco: new FormControl(this.estabdata ? this.estabdata.endereco : '', [Validators.required]),
      telefone: new FormControl(this.estabdata ? this.estabdata.telefone : '', [Validators.required]),
      logo: new FormControl(''),
      cep: new FormControl(this.estabdata ? this.estabdata.cep : '', [Validators.required]),
      email: new FormControl(this.estabdata ? this.estabdata.email : '', [Validators.required]),
      cidade_id: new FormControl(this.estabdata ? this.estabdata.cidade_id: '', [Validators.required],),


    })
  }
  submit() {
    if (this.estabForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.estabForm.value)
  }

  onFileSelected(event:any){

    const file: File = event.target.files[0];
    this.estabForm.patchValue({logo:file})

  }
  voltar(){
    this.location.back()
  }


  get nome() {
    return this.estabForm.get('nome')!;
  }

  get email() {
    return this.estabForm.get('email')!;
  }
  get cnpj() {
    return this.estabForm.get('cnpj')!;
  }
  get telefone() {
    return this.estabForm.get('telefone')!;
  }
  get descricao() {
    return this.estabForm.get('descricao')!;
  }
  get endereco() {
    return this.estabForm.get('endereco')!;
  }
  get cep() {
    return this.estabForm.get('cep')!;
  }
  get cidade_id() {
    return this.estabForm.get('cidade_id')!;
  }

  get usuario_id() {
    return this.estabForm.get('usuario_id')!;
  }


}
