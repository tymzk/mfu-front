import { Component, Input, OnInit, Inject } from '@angular/core';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

import { Subject } from '../models';

@Component({
  selector: 'app-admin-subject',
  template: `
		<app-admin-subject-list [subjects]="subjects">
		</app-admin-subject-list>
		<app-admin-assignment-list>
		</app-admin-assignment-list>
		<app-admin-assignment-item-list>
		</app-admin-assignment-item-list>
		<app-admin-subject-form>
		</app-admin-subject-form>
	`
})

export class AdminSubjectComponent {
	private id: string;
  subjects: Subject[];
  selectedSubject: Subject;

  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.id = this.authService.getId();
    this.getAdminMySubjectList(this.id);
  }

  getAdminMySubjectList(id: string): void {
    this.apiService.getAdminMySubjects(id).subscribe(
      subjects => this.subjects = subjects,
      error => this.subjects = <any>error);
  }
}
