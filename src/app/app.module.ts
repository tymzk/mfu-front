import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { CanActivateViaOAuthGuard } from './oAuth.canActivateGuard';
import { routing } from './app.routes';

import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectListComponent } from './subjectlist/subjectlist.component';
import { PublicComponent } from './public/public.component';
import { ButtonModule } from 'primeng/primeng';
import { AdminComponent } from './admin/admin.component';

import { WindowService } from "./services/window.service";
import { AuthService } from "./services/auth.service";
import { ApiService } from './services/api.service';

import { FileSelectDirective } from 'ng2-file-upload';
import { SubjectComponent } from './subject/subject.component';

//,InMemoryWebApiModule.forRoot(InMemoryDataService)
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    SubjectListComponent,
    PublicComponent,
    FileSelectDirective,
    AdminComponent,
    SubjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonModule,
    routing
  ],
  providers: [
    CanActivateViaOAuthGuard,
    ApiService,
    AuthService,
    WindowService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
