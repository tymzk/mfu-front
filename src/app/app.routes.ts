import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PublicComponent } from './public/public.component';
import { SubjectListComponent } from './subjectlist/subjectlist.component';
import { AdminComponent } from './admin/admin.component';

import { CanActivateViaOAuthGuard } from './oAuth.canActivateGuard';

export const appRoutes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		canActivate : [CanActivateViaOAuthGuard]
	},{
		path: 'admin',
		component: AdminComponent,
		canActivate : [CanActivateViaOAuthGuard]
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
		canActivate : [CanActivateViaOAuthGuard]
	},{
		path: 'public',
		component: PublicComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);