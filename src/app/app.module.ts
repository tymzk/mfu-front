import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ReplaceTextToJsonArray, InsertBreakLinePipe, TextToJsonArrayPipe, RemoveSpacePipe, RemoveBlankLinePipe, ReplaceBreakLineCodePipe } from './pipes/texttojsonarray.pipe';

import { NavbarComponent } from './navbar/navbar.component';
import { UserSubjectComponent } from './user/subject/subject.component';

import { WindowService } from "./services/window.service";
import { AuthService } from "./services/auth.service";
import { ApiService } from './services/api.service';

import { CanActivateViaOAuthGuard } from './oAuth.canActivateGuard';
import { routing } from './app.routes';

import { AdminComponent } from './admin/admin.component';
import { AdminUpdateAdminComponent } from './admin/updateadmin.component';
import { AdminUpdateSubjectComponent } from './admin/updatesubject.component';
//import { AdminSubjectManagementComponent } from './admin/subjectmanagement.component';

import { ConvertUtcToLocalTimePipe } from './pipes/utctolocaltime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent,
    AdminUpdateAdminComponent,
    AdminUpdateSubjectComponent,
    UserSubjectComponent,
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
