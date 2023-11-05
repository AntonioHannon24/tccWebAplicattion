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
import { LoginFuncionariosComponent } from './funcionarios/login-funcionarios/login-funcionarios.component';
import { LoginAdminComponent } from './administrativo/login-admin/login-admin.component';
import { ListaComponent } from './administrativo/listaEstabelecimentos/lista/lista.component';
import { EditEstabelecimentoComponent } from './estabelecimentos/edit-estabelecimento/edit-estabelecimento.component';
import { NewEstabelecimentoComponent } from './estabelecimentos/new-estabelecimento/new-estabelecimento.component';
import { ListaUsuariosComponent } from './administrativo/lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './administrativo/formularios/usuarios/usuarios.component';
import { EditUserComponent } from './administrativo/edit-user/edit-user.component';
import { ListaFuncionariosComponent } from './administrativo/lista-funcionarios/lista-funcionarios.component';
import { admGuard } from './guardas/administradores/adm.guard';
import { estabGuard } from './guardas/estabelecimentos/estab.guard';
import { ListaNoticiasComponent } from './administrativo/lista-noticias/lista-noticias.component';
import { EditNoticiasComponent } from './administrativo/edit-noticias/edit-noticias.component';
import { ListaServicosComponent } from './administrativo/lista-servicos/lista-servicos.component';
import { ListaContatosComponent } from './administrativo/lista-contatos/lista-contatos.component';
import { EditContatosComponent } from './administrativo/edit-contatos/edit-contatos.component';

const routes: Routes = [

  //Rotas sem autenticação
  {path: '', component:HomeComponent },
  {path: 'noticias', component:NoticiasComponent },
  {path: 'estabelecimentos', component:EstabelecimentosComponent },
  {path: 'contato', component:ContatoComponent },
  {path: 'login', component:LoginComponent },
  {path: 'loginFuncionarios', component:LoginFuncionariosComponent },
  {path: 'loginAdmin', component:LoginAdminComponent },
  {path: 'new-estabelecimento', component:NewEstabelecimentoComponent },





  //rotas com autenticação

  {path: 'seuEstabelecimento', component:SeuEstabelecimentoComponent,canActivate:[estabGuard] },
  {path: 'agenda', component:AgendaComponent,canActivate:[estabGuard] },
  {path: 'funcionarios', component:FuncionariosComponent,canActivate:[estabGuard] },
  {path: 'servicos', component:ServicosComponent,canActivate:[estabGuard] },
  {path: 'lista-servicos/:id', component:ListaServicosComponent,canActivate:[admGuard] },
  {path: 'new-servico/:id', component:NewServicesComponent,canActivate:[estabGuard] },
  {path: 'new-servicos/:id', component:NewServicesComponent,canActivate:[admGuard] },
  {path: 'edit-servicos/:id', component:EditServicosComponent,canActivate:[estabGuard] },
  {path: 'new-funcionario/:id', component:NewFuncionariosComponent,canActivate:[estabGuard] },
  {path: 'edit-funcionarios/:id', component:EditFuncionariosComponent,canActivate:[estabGuard] },
  {path: 'edit-contatos/:id', component:EditContatosComponent,canActivate:[admGuard] },
  {path: 'lista-estabelecimentos', component:ListaComponent,canActivate: [admGuard] },
  {path: 'lista-contatos', component:ListaContatosComponent,canActivate: [admGuard] },
  {path: 'lista-usuarios', component:ListaUsuariosComponent,canActivate: [admGuard] },
  {path: 'edit-estabelecimentos/:id', component:EditEstabelecimentoComponent,canActivate: [admGuard]},
  {path: 'edit-seuEstabelecimento/:id', component:EditEstabelecimentoComponent,canActivate: [estabGuard]},
  {path: 'edit-usuario/:id', component:EditUserComponent,canActivate: [admGuard] },
  {path: 'lista-funcionarios/:id', component:ListaFuncionariosComponent,canActivate: [admGuard]},
  {path: 'lista-noticias', component:ListaNoticiasComponent,canActivate: [admGuard]},
  {path: 'edit-noticias/:id', component:EditNoticiasComponent,canActivate: [admGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
