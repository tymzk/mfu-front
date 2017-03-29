import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';

import { Subject } from '../models';

@Component({
  selector: 'app-admin-subject',
  template: `
		<app-admin-subject-list>
		</app-admin-subject-list>
		<app-admin-assignment-list>
		</app-admin-assignment-list>
		<app-admin-assignment-item-list>
		</app-admin-assignment-item-list>
		<app-admin-subject-form>
		</app-admin-subject-form>
		<app-admin-assignment-form>
		</app-admin-assignment-form>
		<app-admin-assignment-item-form>
		</app-admin-assignment-item-form>
	`
})

export class AdminSubjectComponent {
	private id: string;
  private subjects: Subject[];
  selectedSubject: Subject;
  subSubjects: Subscription;
  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.id = this.authService.getId();
    this.getAdminMySubjectList();

    this.subSubjects = this.adminService.adminSubjects$.subscribe(
      subjects => {
        this.subjects = subjects;
      }
    );
  }

  getAdminMySubjectList(): void {
    this.apiService.getAdminMySubjects(this.id).subscribe(
      subjects => {
        this.subjects = subjects;
        this.adminService.onUpdatedSubjects(subjects);
      }
    );
  }

	ngOnDestroy() {
    this.subSubjects.unsubscribe();
	}

}
