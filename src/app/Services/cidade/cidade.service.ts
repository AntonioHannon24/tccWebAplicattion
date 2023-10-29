import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { Cidade } from 'src/app/interfaces/Cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {


  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/cidades`

  constructor(
    private http:HttpClient,
  ) { }

  getAllCidades():Observable<Response<Cidade[]>>{
    return this.http.get<Response<Cidade[]>>(this.apiUrl)
  }
  createCidade(formData:FormData):Observable< FormData >{
    return this.http.post<FormData>(this.apiUrl,formData)
  }
  removeCidade(id:number){
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }
  getCidade(id:number):Observable<Response<Cidade>>{
    const url =`${this.apiUrl}/${id}`
    return this.http.get<Response<Cidade>>(url)
  }

  updateCidade(id:number,formData:FormData):Observable<FormData>{
    const url =`${this.apiUrl}/${id}`
    return this.http.put<FormData>(url,formData)
  }

}