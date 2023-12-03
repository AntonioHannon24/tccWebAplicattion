import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Noticias } from 'src/app/interfaces/Noticas';
import { NoticiasService } from 'src/app/Services/noticias/noticias.service';

@Component({
  selector: 'app-edit-noticias',
  templateUrl: './edit-noticias.component.html',
  styleUrls: ['./edit-noticias.component.css']
})

export class EditNoticiasComponent implements OnInit {

  noticia!:Noticias
  btnText:string = "Editar"
  title:string = "Editar Noticia"

  constructor(
    private noticiasService:NoticiasService,
    private route:ActivatedRoute,
    private message:MessageService,
    private router:Router,
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.noticiasService.getNoticias(id).subscribe(item=>{
      this.noticia = item.data;
    })
  }
  
  async editHandler(noticias:Noticias){
    
    const formData = new FormData()

    formData.append("titulo",noticias.titulo)
    formData.append("descricao",noticias.descricao)
    formData.append("link",noticias.link)
    if(noticias.image){formData.append("image", noticias.image)}


    this.noticiasService.updateNoticias(this.noticia.id,formData).subscribe(()=>{this.goHome()})
    
  }

  goHome(){
    this.router.navigate(['/'])
    this.message.add("A noticia foi editada com sucesso!!")
  }

}