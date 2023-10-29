import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from '../MessageServices/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  private _tipo = new BehaviorSubject<string|null>(null)
  public _id = new BehaviorSubject<Number>(0)

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  id = this._id.asObservable()
  tipo = this._tipo.asObservable()

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/loginEstabelecimento`
  private apiUrlFunc = `${this.baseApiUrl}api/loginFuncionarios`
  private apiUrlAdmin = `${this.baseApiUrl}api/loginAdmin`

  constructor(private http: HttpClient, private messageService: MessageService) {

    const token = localStorage.getItem('auth')
    const tipo = localStorage.getItem('tipo')
    const id = Number(localStorage.getItem('id'));
    this._id.next(id!);
    this._isLoggedIn$.next(!!token)
    this._tipo.next(tipo)
  }

  async login(formData: any): Promise<Observable<any>> {

    return this.http.post(this.apiUrl, formData).pipe(
      tap((response: any): any => {

        this._isLoggedIn$.next(true)
        this._id.next(response.user.id)
        this._tipo.next("Estab")
        //this._role.next(this.admin(response.user.tipo_usuario))

        localStorage.setItem('auth', response.token.token)
        localStorage.setItem('tipo', "Estab")
        localStorage.setItem('id', response.user.id)

        this.log(response.message)

        
      }), catchError((err: any): any => {
        this.handleError(err.error)
        return of()
      })
    )
  }


  async loginFuncionarios(formData:any): Promise<Observable<any>>{

    return this.http.post(this.apiUrlFunc, formData).pipe(
      tap((response: any): any => {

        this._isLoggedIn$.next(true)
        this._id.next(response.user.id)
        this._tipo.next("Func")
        //this._role.next(this.admin(response.user.tipo_usuario))

        localStorage.setItem('auth', response.token.token)
        localStorage.setItem('tipo', "Func")
        localStorage.setItem('id', response.user.id)

        this.log(response.message)

        
      }), catchError((err: any): any => {
        this.handleError(err.error)
        return of()
      })
    )



  }

  async loginAdmin(formData:any): Promise<Observable<any>>{

    return this.http.post(this.apiUrlAdmin, formData).pipe(
      tap((response: any): any => {

        this._isLoggedIn$.next(true)
        this._id.next(response.user.id)
        this._tipo.next("Admin")
        //this._role.next(this.admin(response.user.tipo_usuario))

        localStorage.setItem('auth', response.token.token)
        localStorage.setItem('tipo', "Admin")
        localStorage.setItem('id', response.user.id)
        this.log(response.message)
      }), catchError((err: any): any => {
        this.handleError(err.error)
        return of()
      })
    )



  }


  async logoff() {

    localStorage.clear()
    return true;

  }
  admin(value: any): boolean {
    if (value == "Admin") {
      return true
    } else {
      return false
    }
  }

  private handleError(errorMessage: string) {

    this.log(errorMessage);
  }
  private log(message: string) {
    this.messageService.add(`${message}`);
  }


}
