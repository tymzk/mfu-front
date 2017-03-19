import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PublicComponent } from './public/public.component';
import { SubjectListComponent } from './subjectlist/subjectlist.component';

import { AdminComponent } from './admin/admin.component';
import { AdminUpdateAdminComponent } from './admin/updateadmin.component';
import { AdminUpdateSubjectComponent } from './admin/updatesubject.component';
//import { AdminSubjectManagementComponent } from './admin/subjectmanagement.component';

import { CanActivateViaOAuthGuard } from './oAuth.canActivateGuard';
export const appRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		canActivate : [CanActivateViaOAuthGuard]
	},{
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
		component: SubjectListComponent,
		canActivate : [CanActivateViaOAuthGuard]
	},{
		path: '',
		component: HomeComponent,
	},{
		path: 'public',
		component: PublicComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);