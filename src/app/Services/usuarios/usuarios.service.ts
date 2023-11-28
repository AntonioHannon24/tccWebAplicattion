import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { Usuario } from 'src/app/interfaces/Usuario';
import { MessageService } from '../MessageServices/message.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {



  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/usuarios`
  private desativarUsuarios = `${this.baseApiUrl}api/desativarUsuario`
  private ativarUsuarios = `${this.baseApiUrl}api/ativarUsuario`

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getAllUsuarios(): Observable<Response<Usuario[]>> {
    return this.http.get<Response<Usuario[]>>(this.apiUrl)
  }

  getUsuario(id: number): Observable<Response<Usuario>> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Usuario>>(url)
  }

  removeUser(id: number) {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }
  createUser(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData).pipe(catchError(err => {
      this.handleError(err.error)
      return of()
    })
    )
  }
  updateUsuario(id: number, formData: FormData): Observable<FormData> {
    
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }

  ativarUsuario(id:number){

    const url = `${this.ativarUsuarios}/${id}`
    return this.http.get(url)

  }

  desativarUsuario(id:number){
    const url = `${this.desativarUsuarios}/${id}`
    return this.http.get(url)
  }
  
  private handleError(errorMessage: string) {

    this.log(errorMessage);
  }

  private log(message: string) {
    this.messageService.add(` ${message}`);
  }
}
