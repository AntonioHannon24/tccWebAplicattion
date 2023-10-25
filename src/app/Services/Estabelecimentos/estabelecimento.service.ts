import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MessageService } from 'src/app/Services/MessageServices/message.service';
import { Estabelecimento } from 'src/app/interfaces/Estabelecimento';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/estabelecimentos`
  private apiUrl2 = `${this.baseApiUrl}api/allEstabs`

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getAllEstabelecimentos(): Observable<Response<Estabelecimento[]>> {
    
    return this.http.get<Response<Estabelecimento[]>>(this.apiUrl2)
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

    return this.http.post<FormData>(this.apiUrl, formData).pipe(catchError(err => {
      this.handleError(err.error)
      return of()
    }))

  }
  updateEstab(id: number, formData: FormData): Observable<FormData> {

    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData).pipe(catchError(err => {
      this.handleError(err.error)
      return of()
    }))
  }

  private handleError(errorMessage: string) {

    this.log(errorMessage);
  }
  
  private log(message: string) {
    this.messageService.add(`${message}`);
  }


  
}