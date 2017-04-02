import { Component, OnDestroy, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from '../models';
import { Subscription } from 'rxjs';
import { ReplaceTextToJsonArray, TextToJsonArrayPipe } from '../pipes/texttojsonarray.pipe';

@Component({
  selector: 'app-admin-subject-form',
  templateUrl: './subject-form.component.html'
})
export class AdminSubjectFormComponent implements OnDestroy {

  private id: string;
  subject: Subject;
  private newSubject: Subject;
  subSubjects: Subscription;
	subSubject: Subscription;
	subAssignment: Subscription;
  showUpdateForm: boolean;
  private studentsText: string;

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
    this.studentsText = '';
    this.id = this.authService.getId();
    this.newSubject = new Subject();
    this.newSubject.teachers = [ this.id ];

    this.subSubjects = this.adminService.adminSubjects$.subscribe(
      subjects => {
      }
    );

    this.subSubject = this.adminService.adminSelectedSubject$.subscribe(
      subject => {
        this.subject = subject;
      }
    );
    this.subAssignment = this.adminService.adminSelectedAssignment$.subscribe(
      assignment => {
      }
    );
  }

	ngOnDestroy() {
		this.subSubject.unsubscribe();
    this.subAssignment.unsubscribe();
    this.subSubjects.unsubscribe();
	}

  createSubject(subject: Subject) {
		this.submitted = true;
    this.apiService.createSubject(subject).subscribe(
      subjects => {
        this.submitted = false;
        this.newSubject = new Subject();
        this.newSubject.teachers = [ this.id ];
        this.apiService.getAdminMySubjects(this.id).subscribe(
          subjects => { this.adminService.onUpdatedSubjects(subjects) }
        );
     },
      error => {
        this.submitted = false;
      }
    );
  }

  addTeacher(subjectObjId: string, teacherId: string) {
    this.apiService.addTeacherOfSubject(subjectObjId, teacherId).subscribe(
      subject => {
        this.subject = subject;
        console.log("test" + subject.teachers.length);
/*
        this.apiService.getAdminMySubjects(this.id).subscribe(
          subjects => { this.adminService.onUpdatedSubjects(subjects) }
        );*/
      }
    );
  }

  removeTeacher(subjectObjId: string, teacherId: string){
    this.apiService.removeTeacherOfSubject(subjectObjId, teacherId).subscribe(
      subject => {
        this.subject = subject;
        this.apiService.getAdminMySubjects(this.id).subscribe(
          subjects => { this.adminService.onUpdatedSubjects(subjects) }
        );
      }
    );
  }

  addAssistant(subjectId: string, assistantId: string): void {
    console.log("still in progress");
  }

  removeAssistant(subjectObjId: string, assistantId: string): void {
    console.log("still in progress");
  }

  updateStudents(subjectObjId: string, studentsText: string): void {
    this.apiService.updateStudentsOfSubject(subjectObjId, ReplaceTextToJsonArray(studentsText));
  }
  updateSubject(subject: Subject) {
    this.submitted = true;
    this.apiService.updateSubject(subject._id, subject).subscribe(
      subjects => {
        this.submitted = false;
        this.apiService.getAdminMySubjects(this.id).subscribe(
          subjects => { this.adminService.onUpdatedSubjects(subjects) }
        );
      },
      error => {
        this.submitted = false;
      }
    );
    this.submitted = false;
  }

}
