import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './travelpage/footer/footer.component';
import { HeaderComponent } from './travelpage/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { EstabelecimentosComponent } from './pages/estabelecimentos/estabelecimentos.component';
import { MessagesComponent } from './messages/messages.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContatoComponent } from './pages/contato/contato.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SeuEstabelecimentoComponent } from './estabelecimentos/seu-estabelecimento/seu-estabelecimento.component';
import { ServicosComponent } from './estabelecimentos/servicos/servicos.component';
import { FuncionariosComponent } from './estabelecimentos/funcionarios/funcionarios.component';
import { AgendaComponent } from './estabelecimentos/agenda/agenda.component';
import { FormServicosComponent } from './estabelecimentos/formularios/form-servicos/form-servicos.component';
import { EditServicosComponent } from './estabelecimentos/edit-servicos/edit-servicos.component';
import { EditFuncionariosComponent } from './estabelecimentos/edit-funcionarios/edit-funcionarios.component';
import { FormFuncionariosComponent } from './estabelecimentos/formularios/form-funcionarios/form-funcionarios.component';
import { NewServicesComponent } from './estabelecimentos/new-services/new-services.component';
import { NewFuncionariosComponent } from './estabelecimentos/new-funcionarios/new-funcionarios.component';
import { LoginFuncionariosComponent } from './funcionarios/login-funcionarios/login-funcionarios.component';
import { LoginAdminComponent } from './administrativo/login-admin/login-admin.component';
import { ListaComponent } from './administrativo/listaEstabelecimentos/lista/lista.component';
import { EditEstabelecimentoComponent } from './estabelecimentos/edit-estabelecimento/edit-estabelecimento.component';
import { FormEstabelecimentoComponent } from './estabelecimentos/formularios/form-estabelecimento/form-estabelecimento.component';
import { NewEstabelecimentoComponent } from './estabelecimentos/new-estabelecimento/new-estabelecimento.component';
import { ListaUsuariosComponent } from './administrativo/lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './administrativo/formularios/usuarios/usuarios.component';
import { EditUserComponent } from './administrativo/edit-user/edit-user.component';
import { ListaFuncionariosComponent } from './administrativo/lista-funcionarios/lista-funcionarios.component';
import { ListaNoticiasComponent } from './administrativo/lista-noticias/lista-noticias.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    NoticiasComponent,
    EstabelecimentosComponent,
    MessagesComponent,
    ContatoComponent,
    LoginComponent,
    SeuEstabelecimentoComponent,
    ServicosComponent,
    FuncionariosComponent,
    AgendaComponent,
    FormServicosComponent,
    EditServicosComponent,
    EditFuncionariosComponent,
    FormFuncionariosComponent,
    NewServicesComponent,
    NewFuncionariosComponent,
    LoginFuncionariosComponent,
    LoginAdminComponent,
    ListaComponent,
    EditEstabelecimentoComponent,
    FormEstabelecimentoComponent,
    NewEstabelecimentoComponent,
    ListaUsuariosComponent,
    UsuariosComponent,
    EditUserComponent,
    ListaFuncionariosComponent,
    ListaNoticiasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
