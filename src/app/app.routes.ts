import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserSubjectComponent } from './user/subject/subject.component';

import { AdminComponent } from './admin/admin.component';
import { AdminUpdateAdminComponent } from './admin/updateadmin.component';
import { AdminUpdateSubjectComponent } from './admin/updatesubject.component';
//import { AdminSubjectManagementComponent } from './admin/subjectmanagement.component';

import { CanActivateViaOAuthGuard } from './oAuth.canActivateGuard';
export const appRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate : [CanActivateViaOAuthGuard],
		children: [ {
				path: 'admins',
				component: AdminUpdateAdminComponent
			},
			{
				path: 'subjects',
				component: AdminUpdateSubjectComponent
			}
		]
	},{
		path: 'auth/callback',
		component: AppComponent
	},{
		path: 'subjects',
		component: UserSubjectComponent,
		canActivate : [CanActivateViaOAuthGuard]
	},{
		path: '',
		component: HomeComponent,
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);