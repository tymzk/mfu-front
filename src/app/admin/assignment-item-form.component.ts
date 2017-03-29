import { Component, OnDestroy, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Assignment, AssignmentItem } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-assignment-item-form',
  templateUrl: './assignment-item-form.component.html'
})
export class AdminAssignmentItemFormComponent implements OnDestroy {

  private subject: Subject;
  private assignment: Assignment;
  private assignmentItem: AssignmentItem;
	subSubject: Subscription;
	subAssignment: Subscription;
	subAssignmentItem: Subscription;
	submitted: boolean = false;

  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private fb: FormBuilder) {
    this.subSubject = this.adminService.adminSelectedSubject$.subscribe(
      subject => {
        this.subject = subject;
        this.assignment = null;
        this.assignmentItem = null;
      }
    );
    this.subAssignment = this.adminService.adminSelectedAssignment$.subscribe(
      assignment => {
        this.assignment = assignment;
        this.assignmentItem = null;
      }
    );
    this.subAssignmentItem = this.adminService.adminSelectedAssignmentItem$.subscribe(
      assignmentItem => {
        this.assignmentItem = assignmentItem;
      }
    );
  }

	ngOnDestroy() {
		this.subSubject.unsubscribe();
		this.subAssignment.unsubscribe();
		this.subAssignmentItem.unsubscribe();
	}

  createAssignment(subjectObjId: String, assignment: Assignment) {
		this.submitted = true;
    this.apiService.createAssignment(subjectObjId, assignment);
  }

  updateAssignment(subjectObjId: string, assignment: Assignment) {
    this.apiService.updateAssignment(subjectObjId, assignment);
  }
}
