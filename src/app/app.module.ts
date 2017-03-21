import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AlertModule } from 'ng2-bootstrap';

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
import { AdminSubjectComponent } from './admin/subject.component';
import { AdminSubjectFormComponent } from './admin/subject-form.component';
import { AdminAssignmentFormComponent } from './admin/assignment-form.component';
import { AdminAssignmentItemFormComponent } from './admin/assignment-item-form.component';
import { AdminAssignmentListComponent } from './admin/assignment-list.component';
import { AdminAssignmentItemListComponent } from './admin/assignment-item-list.component';

import { AdminUpdateAdminComponent } from './admin/updateadmin.component';
import { AdminUpdateSubjectComponent } from './admin/updatesubject.component';
import { AdminSubjectListComponent } from './admin/subject-list.component';

import { ConvertUtcToLocalTimePipe } from './pipes/utctolocaltime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AdminComponent,
    AdminUpdateAdminComponent,
    AdminSubjectComponent,
    AdminSubjectListComponent,
    AdminSubjectFormComponent,
    AdminAssignmentFormComponent,
    AdminAssignmentItemFormComponent,
    AdminAssignmentListComponent,
    AdminAssignmentItemListComponent,
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
    FlexLayoutModule,
    AlertModule,
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
