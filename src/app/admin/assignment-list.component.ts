import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';

import { Subject, Assignment } from '../models';

@Component({
  selector: 'app-admin-assignment-list',
  templateUrl: './assignment-list.component.html'
})

export class AdminAssignmentListComponent implements OnDestroy {
  id: string;
  selectedSubject: Subject;
	selectedAssignment: Assignment;
	subSubject: Subscription;

  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private authService: AuthService) {
			this.subSubject = adminService.adminSelectedSubject$.subscribe(
				subject => {
					this.selectedSubject = subject;
					this.selectedAssignment = null;
				}
			);
  }

  onSelectAssignment(assignment: Assignment): void {
    this.selectedAssignment = assignment;
    this.adminService.onSelectedAssignment(assignment);
  }

	ngOnDestroy() {
		this.subSubject.unsubscribe();
	}

}
