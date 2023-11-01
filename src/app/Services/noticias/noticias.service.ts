import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { Noticias } from 'src/app/interfaces/Noticas';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {


  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/noticias`

  constructor(private http:HttpClient) { }

    getAllNoticias():Observable<Response<Noticias[]>>{
      return this.http.get<Response<Noticias[]>>(this.apiUrl)
    }
  
    getNoticias(id:number):Observable<Response<Noticias>>{
      const url =`${this.apiUrl}/${id}`
      return this.http.get<Response<Noticias>>(url)
    }
  
    removeNoticas(id:number){
      const url = `${this.apiUrl}/${id}`
      return this.http.delete(url)
    }
    createNoticias(formData:FormData):Observable< FormData >{
      return this.http.post<FormData>(this.apiUrl,formData)
    
    }
    updateNoticias(id:number,formData:FormData):Observable<FormData>{

      const url =`${this.apiUrl}/${id}`
      return this.http.put<FormData>(url,formData)
    }
  
  


}

