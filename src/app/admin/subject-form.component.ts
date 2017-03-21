import { Component, OnDestroy, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-subject-form',
  templateUrl: './subject-form.component.html'
})
export class AdminSubjectFormComponent implements OnDestroy {

  private id: string;
  private subject: Subject;
  private newSubject: Subject;
	subSubject: Subscription;
	submitted: boolean = false;
  private semesterOptions = [
    { value: null, name: '未定' },
    { value: 'spring', name: '前期' },
    { value: 'autumn', name: '後期' }
  ];
  constructor(
    private apiService: ApiService,
    private adminService: AdminService,
    private authService: AuthService) {

    this.subject = null;

    this.id = this.authService.getId();
    this.newSubject = new Subject();
    this.newSubject.teachers = [ this.id ];

    this.subSubject = this.adminService.adminSelectedSubject$.subscribe(
      subject => {
        this.subject = subject;
      }
    );
  }

	ngOnDestroy() {
		this.subSubject.unsubscribe();
	}

  createSubject(subject: Subject) {
		this.submitted = true;
    this.apiService.createSubject(subject).subscribe(
      subjects => {
        this.submitted = false;
        this.newSubject = new Subject();
        this.newSubject.teachers = [ this.id ];
      },
      error => {
        this.submitted = false;
      }
    );
  }

  updateSubject(subject: Subject) {
    this.submitted = true;
    this.apiService.updateSubject(subject._id, subject).subscribe(
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
