import { Component, OnDestroy, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Assignment } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-assignment-form',
  templateUrl: './assignment-form.component.html'
})
export class AdminAssignmentFormComponent implements OnDestroy {

  private subject: Subject;
  private assignment: Assignment;
	subSubject: Subscription;
	subAssignment: Subscription;
  subjectForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder) {

    this.subSubject = this.adminService.adminSelectedSubject$.subscribe(
      subject => {
        this.subject = subject;
        this.assignment = null;
      }
    );
    this.subAssignment = this.adminService.adminSelectedAssignment$.subscribe(
      assignment => {
        this.assignment = assignment;
      }
    );
  }

	onSubmit() {
		this.submitted = true;
	}

	ngOnDestroy() {
		this.subSubject.unsubscribe();
		this.subAssignment.unsubscribe();
	}

  updateAssignment(subjectObjId: string, assignment: Assignment) {
    this.submitted = true;
    this.apiService.updateAssignment(subjectObjId, assignment).subscribe(
      subjects => {
        this.submitted = false;
      },
      error => {
        this.submitted = false;
      }
    );
    this.submitted = false;
  }

}
