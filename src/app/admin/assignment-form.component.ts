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
  private id: string;
  subject: Subject;
  assignment: Assignment;
  private newAssignment: Assignment;
  private submitted: boolean;
	subSubject: Subscription;
	subAssignment: Subscription;
  subjectForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.submitted = false;
    this.newAssignment = new Assignment();
    this.id = this.authService.getId();

    this.subSubject = this.adminService.adminSelectedSubject$.subscribe(
      subject => {
        this.subject = subject;
        this.assignment = null;
      }
    );
    this.subAssignment = this.adminService.adminSelectedAssignment$.subscribe(
      assignment => {
        this.assignment = new Assignment().deserialize(assignment);
        console.log(this.assignment.deadline.toISOString());
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
  createAssignment(subjectObjId: string, assignment: Assignment) {
    this.submitted = true;
    this.apiService.createAssignment(subjectObjId, assignment).subscribe(
      () => {
        this.submitted = false;
        this.newAssignment = new Assignment();
        this.apiService.getAdminMySubjects(this.id).subscribe(
          subjects => { this.adminService.onUpdatedSubjects(subjects) }
        );
      }
    );
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
