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
  //private _role = new BehaviorSubject<boolean>(false)
  public _id = new BehaviorSubject<Number>(0)

  isLoggedIn$ = this._isLoggedIn$.asObservable();
  //role = this._role.asObservable()
  id = this._id.asObservable()
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/loginEstabelecimento`

  constructor(private http: HttpClient, private messageService: MessageService) {

    const token = localStorage.getItem('auth')
    //const role = localStorage.getItem('role')
    const id = Number(localStorage.getItem('id'));
    this._id.next(id!);
    this._isLoggedIn$.next(!!token)
    //this._role.next(this.admin(role))
  }

  async login(formData: any): Promise<Observable<any>> {

    return this.http.post(this.apiUrl, formData).pipe(
      tap((response: any): any => {

        this._isLoggedIn$.next(true)
        this._id.next(response.user.id)
        //this._role.next(this.admin(response.user.tipo_usuario))

        localStorage.setItem('auth', response.token.token)
        //localStorage.setItem('role', response.user.tipo_usuario)
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
