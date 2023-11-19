import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { Funcionario } from 'src/app/interfaces/Funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService { 
  
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/funcionarios`
  private funcEstab = `${this.baseApiUrl}api/funcionariosEstab`
  private funcdesativarFuncionario = `${this.baseApiUrl}api/desativarFuncionario`
  private funcativarFuncionario = `${this.baseApiUrl}api/ativarFuncionario`
  constructor(private http:HttpClient) { }

    getAllFuncionarios():Observable<Response<Funcionario[]>>{
      return this.http.get<Response<Funcionario[]>>(this.apiUrl)
    }
  
    getFuncionario(id:number):Observable<Response<Funcionario>>{
      const url =`${this.apiUrl}/${id}`
      return this.http.get<Response<Funcionario>>(url)
    }
  
    removeFuncionario(id:number){
      const url = `${this.apiUrl}/${id}`
      return this.http.delete(url)
    }
    createFuncionario(formData:FormData):Observable< FormData >{
      return this.http.post<FormData>(this.apiUrl,formData)
    
    }
    updateFuncionario(id:number,formData:FormData):Observable<FormData>{

      const url =`${this.apiUrl}/${id}`
      return this.http.put<FormData>(url,formData)
    }
  
    funcionariosEstab(id:number):Observable<Response<Funcionario[]>>{
      const url =`${this.funcEstab}/${id}`
      return this.http.get<Response<Funcionario[]>>(url)
    }
    desativarFuncionario(id:number){
      const url =`${this.funcdesativarFuncionario}/${id}`
      return this.http.get(url)
    }
    ativarFuncionario(id:number){
      const url =`${this.funcativarFuncionario}/${id}`
      return this.http.get(url)
    }

}

