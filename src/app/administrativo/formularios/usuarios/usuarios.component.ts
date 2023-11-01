import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/Usuario';
import { CidadeService } from 'src/app/Services/cidade/cidade.service';
import { Cidade } from 'src/app/interfaces/Cidade';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{


  allCidades: Cidade[] = []
  cidades: Cidade[] = []

  @Output() onSubmit = new EventEmitter<Usuario>()
  @Input() btnText!: string
  @Input() title!: string
  @Input() userData: Usuario | null = null;

  userForm!: FormGroup;
  coencidem: number = 0

  constructor(private cidadeService: CidadeService, private location:Location) { }

  ngOnInit(): void {

    this.cidadeService.getAllCidades().subscribe((items) => {
      const data = items.data
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString('pt-BR')
      })
      this.allCidades = data
      this.cidades = data
    })

    this.userForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(this.userData ? this.userData.nome : '', [Validators.required]),
      email: new FormControl(this.userData ? this.userData.email : '', [Validators.required]),
      cpf: new FormControl(this.userData ? this.userData.cpf : '', [Validators.required]),
      cidade_id: new FormControl(this.userData ? this.userData.cidade_id : '', [Validators.required]),
      password: new FormControl(this.userData ? this.userData.password : '', [Validators.required]),
      password2: new FormControl(),

    })
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }
    if(this.conferir() && this.conferirCpf()){
      this.onSubmit.emit(this.userForm.value)
      console.log(this.conferirCpf())
    }else{
      window.alert("Confira os dados no formulário!!")
    }
  }


  voltar(){
    this.location.back()
  }



  conferir() {
    const senha = this.userForm.get('password')!.value;
    const confirmarSenha = this.userForm.get('password2')!.value;
    if (senha === confirmarSenha) {
      return true
    } else {
      return false
    }
  }
  conferirCpf() {
    const cpf = this.userForm.value.cpf

    if (cpf.length !== 11) {
      return false;
    }
    let total = 0;
    for (let i = 0; i < 9; i++) {
      total += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digitoVerificador1 = 11 - (total % 11);
    if (digitoVerificador1 > 9) {
      digitoVerificador1 = 0;
    }
    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
      return false;
    }
    total = 0;
    for (let i = 0; i < 10; i++) {
      total += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digitoVerificador2 = 11 - (total % 11);
    if (digitoVerificador2 > 9) {
      digitoVerificador2 = 0;
    }

    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
      return false;
    }
    return true;
}
  get nome() {
    return this.userForm.get('nome')!;
  }

  get cpf() {
    return this.userForm.get('cpf')!;
  }

  get email() {
    return this.userForm.get('email')!;
  }

}


