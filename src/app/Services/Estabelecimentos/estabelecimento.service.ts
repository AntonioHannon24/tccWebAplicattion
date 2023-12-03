import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/estabelecimentos`
  private ativarEstab = `${this.baseApiUrl}api/ativarEstab` 
  private desativarEstab = `${this.baseApiUrl}api/desativarEstab`
  private allSemLogar = `${this.baseApiUrl}api/allEstabelecimentosClientes`

  constructor(
    private http: HttpClient,
  ) { }

  getAllEstabelecimentos(): Observable<Response<Estabelecimento[]>> {
    
    return this.http.get<Response<Estabelecimento[]>>(this.apiUrl)
  }

  allEstabelecimentoSemLogar(): Observable<Response<Estabelecimento[]>>{

    return this.http.get<Response<Estabelecimento[]>>(this.allSemLogar)
  }

  getEstabelecimento(id: number): Observable<Response<Estabelecimento>> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Estabelecimento>>(url)
  }

  removeEstab(id: number) {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }

  createEstab(formData: FormData): Observable<FormData> {

    return this.http.post<FormData>(this.apiUrl, formData)

  }
  updateEstab(id: number, formData: FormData): Observable<FormData> {

    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }

  desativarEstabelecimentos(id: number) {
    const url = `${this.desativarEstab}/${id}`
    return this.http.get(url)
  }
  ativarEstabelecimentos(id: number) {
    const url = `${this.ativarEstab}/${id}`
    return this.http.get(url)
  }


  
}
