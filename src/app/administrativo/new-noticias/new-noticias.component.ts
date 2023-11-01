import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/Services/noticias/noticias.service';
import { Noticias } from 'src/app/interfaces/Noticas';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/Services/MessageServices/message.service';


@Component({
  selector: 'app-new-noticias',
  templateUrl: './new-noticias.component.html',
  styleUrls: ['./new-noticias.component.css']
})
export class NewNoticiasComponent implements OnInit{


  title: string = "Nova noticia"
  btnText: string = "Criar"

  constructor(
    private noticiasService: NoticiasService,
    private route: Router,
 
    private messageService: MessageService
  ) { }

  ngOnInit(): void {}

  async createHandle(noticias: Noticias) {
    const formData = new FormData();


    formData.append("titulo",noticias.titulo)
    formData.append("descricao",noticias.descricao)
    formData.append("link",noticias.link)
    if(noticias.image){formData.append("image", noticias.image)}



    await this.noticiasService.createNoticias(formData).subscribe(() => { this.goHome()})
  }

  goHome() {
    this.route.navigate(['']).then(() => {
      this.messageService.add("Noticia criada com sucesso!!")
    }
    )

  }

}
