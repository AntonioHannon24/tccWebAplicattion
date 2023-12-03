import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/Response';
import { Agenda } from 'src/app/interfaces/Agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/agendamentos`
  private agendaEstabelecimentos = `${this.baseApiUrl}api/agendaEstabelecimentos`
  private agendaFuncionarios = `${this.baseApiUrl}api/agendaFuncionarios`
  private agendaDataEstabelecimentos = `${this.baseApiUrl}api/agendaDataEstabelecimento`
  private agendaEstabelecimentosFechados = `${this.baseApiUrl}api/agendaEstabelecimentosFechado`
  private reabrirAgenda = `${this.baseApiUrl}api/reabrirAgenda`
  private agendaEstabelecimentosNovos = `${this.baseApiUrl}api/agendaEstabelecimentosNovos`
  private aceitarAgenda = `${this.baseApiUrl}api/aceitarAgenda`
  private recusarAgenda = `${this.baseApiUrl}api/recusarAgenda`
  private fecharAgenda = `${this.baseApiUrl}api/fecharAgenda`
  private emAtendimento = `${this.baseApiUrl}api/emAtendimentoAgenda`
  private allAgendamentosEstabs = `${this.baseApiUrl}api/allAgendamentosEstab`


  constructor(
    private http:HttpClient,
  ) { }


  removeAgenda(id:number){
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }

  getAgenda(id:number):Observable<Response<Agenda>>{
    const url =`${this.apiUrl}/${id}`
    return this.http.get<Response<Agenda>>(url)
  }

  updateAgenda(id:number,formData:FormData):Observable<FormData>{

    const url =`${this.apiUrl}/${id}`
    return this.http.put<FormData>(url,formData)
  }

  getAgendaEstabelecimento(id:number):Observable<Response<Agenda[]>>{
    const url =`${this.agendaEstabelecimentos}/${id}`
    return this.http.get<Response<Agenda[]>>(url)
  }

  allAgendamentosEstab(id:number):Observable<Response<Agenda[]>>{
    const url =`${this.allAgendamentosEstabs}/${id}`
    return this.http.get<Response<Agenda[]>>(url)
  }

  getAgendaFuncionario(id:number):Observable<Response<Agenda[]>>{
    const url =`${this.agendaFuncionarios}/${id}`
    return this.http.get<Response<Agenda[]>>(url)
  }

  agendaDataEstabelecimento(id:number,date:string):Observable<Response<Agenda[]>>{
    const url =`${this.agendaDataEstabelecimentos}/${id}/${date}`
    return this.http.get<Response<Agenda[]>>(url)
  }

  agendaEstabelecimentosFechado(id:number):Observable<Response<Agenda[]>>{
    const url =`${this.agendaEstabelecimentosFechados}/${id}`
    return this.http.get<Response<Agenda[]>>(url)
  }

  reabrirAgendas(id:number):any{
    const url =`${this.reabrirAgenda}/${id}`
    return this.http.get<FormData>(url)
  }

  agendaEstabelecimentosNovo(id:number):Observable<Response<Agenda[]>>{
    const url =`${this.agendaEstabelecimentosNovos}/${id}`
    return this.http.get<Response<Agenda[]>>(url)

  }

  aceitarAgendas(id:number,idFuncionario:number):any{
    const url =`${this.aceitarAgenda}/${id}/${idFuncionario}`
    return this.http.get<FormData>(url)
  }

  fecharAgendas(id:number):any{
    const url =`${this.fecharAgenda}/${id}`
    return this.http.get<FormData>(url)
  }

  recusarAgendas(id:number):any{
    const url =`${this.recusarAgenda}/${id}`
    return this.http.get<FormData>(url)
  }
  
  emAtendimentoAgenda(id:number):any{
    const url =`${this.emAtendimento}/${id}`
    return this.http.get<FormData>(url)

  }

}