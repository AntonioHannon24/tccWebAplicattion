import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { Contato } from 'src/app/interfaces/Contato';


@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(
    private http: HttpClient,
  ) { }


  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/contato`
  private resp = `${this.baseApiUrl}api/resposta`

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
  resposta(id:number,formData:FormData){
    const url =`${this.resp}/${id}`
    return this.http.post<FormData>(url,formData)
  }


}
