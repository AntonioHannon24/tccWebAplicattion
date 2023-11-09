import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { Pet } from 'src/app/interfaces/Pet';


@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/pets`

  constructor(
    private http: HttpClient,
  ) { }

  getPet(id:number):Observable<Response<Pet>>{
    const url =`${this.apiUrl}/${id}`
    return this.http.get<Response<Pet>>(url)
  }

}
