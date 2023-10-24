import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { LoginComponent } from './pages/login/login.component';
import { SeuEstabelecimentoComponent } from './estabelecimentos/seu-estabelecimento/seu-estabelecimento.component';
import { AgendaComponent } from './estabelecimentos/agenda/agenda.component';
import { FuncionariosComponent } from './estabelecimentos/funcionarios/funcionarios.component';
import { ServicosComponent } from './estabelecimentos/servicos/servicos.component';
import { EditServicosComponent } from './estabelecimentos/edit-servicos/edit-servicos.component';
import { EditFuncionariosComponent } from './estabelecimentos/edit-funcionarios/edit-funcionarios.component';
import { NewServicesComponent } from './estabelecimentos/new-services/new-services.component';
import { NewFuncionariosComponent } from './estabelecimentos/new-funcionarios/new-funcionarios.component';

const routes: Routes = [

  //Rotas sem autenticação
  {path: '', component:HomeComponent },
  {path: 'noticias', component:NoticiasComponent },
  {path: 'estabelecimentos', component:EstabelecimentosComponent },
  {path: 'contato', component:ContatoComponent },
  {path: 'login', component:LoginComponent },





  //rotas com autenticação

  {path: 'seuEstabelecimento', component:SeuEstabelecimentoComponent },
  {path: 'agenda', component:AgendaComponent },
  {path: 'funcionarios', component:FuncionariosComponent },
  {path: 'servicos', component:ServicosComponent },
  {path: 'new-servico/:id', component:NewServicesComponent },
  {path: 'edit-servicos/:id', component:EditServicosComponent },
  {path: 'new-funcionario/:id', component:NewFuncionariosComponent },
  {path: 'edit-funcionarios/:id', component:EditFuncionariosComponent },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
