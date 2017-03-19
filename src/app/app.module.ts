import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdInputModule } from '@angular/material';

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

import { ReplaceTextToJsonArray, InsertBreakLinePipe, TextToJsonArrayPipe, RemoveSpacePipe, RemoveBlankLinePipe, ReplaceBreakLineCodePipe } from './pipes/texttojsonarray.pipe';

import { AdminUpdateAdminComponent } from './admin/updateadmin.component';
import { AdminUpdateSubjectComponent } from './admin/updatesubject.component';
//import { AdminSubjectManagementComponent } from './admin/subjectmanagement.component';

import { ConvertUtcToLocalTimePipe } from './pipes/utctolocaltime.pipe';

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
    AdminUpdateAdminComponent,
    AdminUpdateSubjectComponent,
    SubjectComponent,
    RemoveSpacePipe,
    RemoveBlankLinePipe,
    ReplaceBreakLineCodePipe,
    InsertBreakLinePipe,
    TextToJsonArrayPipe,
    ConvertUtcToLocalTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonModule,
    MaterialModule,
    MdInputModule,
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
