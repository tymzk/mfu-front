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

	submitted: boolean = false;

	onSubmit() {
		this.submitted = true;
	}

	ngOnDestroy() {
		this.subSubject.unsubscribe();
		this.subAssignment.unsubscribe();
	}
}
