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
  private id: string;

  subject: Subject;
  assignment: Assignment;
  assignmentItem: AssignmentItem;
  private newAssignmentItem: AssignmentItem;
  private submitted: boolean;
	subSubject: Subscription;
	subAssignment: Subscription;
	subAssignmentItem: Subscription;

  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder) {
    this.submitted = false;
    this.id = this.authService.getId();
    this.newAssignmentItem = new AssignmentItem();

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

 createAssignmentItem(subjectObjId: string, assignmentObjId: string, assignmentItem: AssignmentItem) {
    this.apiService.createAssignmentItem(subjectObjId, assignmentObjId, assignmentItem).subscribe(
      subject => {
        this.submitted = false;
        this.newAssignmentItem = new AssignmentItem();
        this.apiService.getAdminMySubjects(this.id).subscribe(
          subjects => { this.adminService.onUpdatedSubjects(subjects)
            for(var i=0; i < subject.length; i++){
              if(subject[i]._id == subject[i]._id){

              }
            }
          }
        );

      }
    );
  }

  updateAssignmentItem(subjectObjId: string, assignmentObjId: string, assignmentItem: AssignmentItem) {
    this.apiService.updateAssignmentItem(subjectObjId, assignmentObjId, assignmentItem).subscribe(
      () => {

      }
    );
  }
}
