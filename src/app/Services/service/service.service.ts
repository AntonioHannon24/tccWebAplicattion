import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { Servicos } from 'src/app/interfaces/Servicos';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/servicos`
  private ativarServ = `${this.baseApiUrl}api/ativarServico`
  private desativarServ = `${this.baseApiUrl}api/desativarServico`
  private servicosEst = `${this.baseApiUrl}api/servicoEstab`

  constructor(
    private http: HttpClient,
  ) { }


  getAllServicos(): Observable<Response<Servicos[]>> {
    return this.http.get<Response<Servicos[]>>(this.apiUrl)
  }

  getServico(id: number): Observable<Response<Servicos>> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Servicos>>(url)
  }

  removeServico(id: number) {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }
  createServico(formData: FormData): Observable<FormData> {

    return this.http.post<FormData>(this.apiUrl, formData)

  }
  updateServico(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }

  desativarServico(id: number) {
    const url = `${this.desativarServ}/${id}`
    return this.http.get(url)
  }
  ativarServico(id: number) {
    const url = `${this.ativarServ}/${id}`
    return this.http.get(url)
  }
  servicoEstab(id: number): Observable<Response<Servicos[]>> {

    const url = `${this.servicosEst}/${id}`
    return this.http.get<Response<Servicos[]>>(url)

  }


}
