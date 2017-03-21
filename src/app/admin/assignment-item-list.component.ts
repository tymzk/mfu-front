import { Component, OnDestroy } from '@angular/core';

import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';

import { Assignment, AssignmentItem } from '../models';

@Component({
  selector: 'app-admin-assignment-item-list',
  templateUrl: './assignment-item-list.component.html'
})

export class AdminAssignmentItemListComponent implements OnDestroy {

	selectedAssignment: Assignment;
  selectedAssignmentItem: AssignmentItem;
	subSubject: Subscription;
  subAssignment: Subscription;

  constructor(private adminService: AdminService) {
    this.subSubject = this.adminService.adminSelectedSubject$.subscribe(
      subject => {
        this.selectedAssignment = null;
        this.selectedAssignmentItem = null;
      }
    );

    this.subAssignment = this.adminService.adminSelectedAssignment$.subscribe(
      assignment => {
        this.selectedAssignment = assignment;
        this.selectedAssignmentItem = null;
      }
    );
  }

  onSelectAssignmentItem(assignmentItem: AssignmentItem): void {
    this.selectedAssignmentItem = assignmentItem;
    this.adminService.onSelectedAssignmentItem(assignmentItem);
  }

	ngOnDestroy() {
		this.subSubject.unsubscribe();
		this.subAssignment.unsubscribe();
	}

}
