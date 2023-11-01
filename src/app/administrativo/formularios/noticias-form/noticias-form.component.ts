import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Noticias } from 'src/app/interfaces/Noticas';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noticias-form',
  templateUrl: './noticias-form.component.html',
  styleUrls: ['./noticias-form.component.css']
})
export class NoticiasFormComponent implements OnInit{


  @Output() onSubmit = new EventEmitter<Noticias>()
  @Input() btnText!: string
  @Input() title!: string
  @Input() noticiasData: Noticias | null = null;

  noticiaForm!: FormGroup;


  constructor(private location:Location) { }

  ngOnInit(): void {

    this.noticiaForm = new FormGroup({
      id: new FormControl(''),
      titulo: new FormControl(this.noticiasData ? this.noticiasData.titulo : '', [Validators.required]),
      descricao: new FormControl(this.noticiasData ? this.noticiasData.descricao : '', [Validators.required]),
      link: new FormControl(this.noticiasData ? this.noticiasData.link : '', [Validators.required]),
      image: new FormControl(),
    })
  }


  submit() {
    if (this.noticiaForm.invalid) {
      return;
    }
    
      this.onSubmit.emit(this.noticiaForm.value)

    
  }
  get titulo() {
    return this.noticiaForm.get('titulo')!;
  }

  get descricao() {
    return this.noticiaForm.get('descricao')!;
  }
  get link() {
    return this.noticiaForm.get('link')!;
  }


  voltar(){
    this.location.back()
  }

  onFileSelected(event:any){

    const file: File = event.target.files[0];
    this.noticiaForm.patchValue({image:file})

  }



}
