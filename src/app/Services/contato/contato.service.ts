import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';
import { Contato } from 'src/app/interfaces/Contato';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/contato`

  getAllContato():Observable<Response<Contato[]>>{
    return this.http.get<Response<Contato[]>>(this.apiUrl)
  }
  createContato(formData:FormData):Observable< FormData >{
    return this.http.post<FormData>(this.apiUrl,formData)
  }

  getContato(id:number):Observable<Response<Contato>>{
    const url =`${this.apiUrl}/${id}`
    return this.http.get<Response<Contato>>(url)
  }

  updateContato(id:number,formData:FormData):Observable<FormData>{
    const url =`${this.apiUrl}/${id}`
    return this.http.put<FormData>(url,formData)
  }

  private handleError(errorMessage: string) {

    this.log(errorMessage);
  }
  private log(message: string) {
    this.messageService.add(`${message}`);
  }


}
