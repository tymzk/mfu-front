/*
import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Subject, Person, Assignment, AssignmentItem } from '../models';
import { ReplaceTextToJsonArray, TextToJsonArrayPipe } from '../pipes/texttojsonarray.pipe';
import { ConvertUtcToLocalTimePipe } from '../pipes/utctolocaltime.pipe';

@Component({
  selector: 'app-admin-update-subject',
  templateUrl: './updatesubject.component.html',
  providers: [ ApiService ]
})
export class AdminUpdateSubjectComponent implements OnInit {

  private id: string;

  updateTeacherForm: FormGroup;
  createSubjectForm: FormGroup;
  assignmentForm: FormGroup;
	assignmentItemForm: FormGroup;

  subjects: Subject[];
  teachers: Person[];
  selectedSubject: Subject;
	selectedAssignment: Assignment;
	selectedAssignmentItem: AssignmentItem;
  studentList: String;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    console.log(this.authService.isAuthenticated());
  }

  ngOnInit() {
    this.studentList = '';
    this.id = this.authService.getId();
    this.getAdminMySubjectList(this.id);

    var initialDate = new Date(2000, 1,1 );

    this.createSubjectForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ] ],
      public: [false, [
      ] ],
      teachers: this.fb.array([ [
        this.id,
        Validators.required
      ] ]),
      semester: ['', [
      ] ]
    });

    this.updateTeacherForm = this.fb.group({
      id : ['',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]
    });

    this.assignmentForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ] ],
      public: [false, [
      ] ],
      description: ['', [
      ] ],
      deadline: [initialDate, [
      ] ]
    });

  }

  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
		this.selectedAssignment = null;
		this.selectedAssignmentItem = null;
  }

  onSelectAssignment(assignment: Assignment): void {
		this.selectedAssignment = assignment;
		this.selectedAssignmentItem = null;
  }

  onSelectAssignmentItem(assignmentItem: AssignmentItem): void {
		this.selectedAssignmentItem = assignmentItem;
  }

  onSelectUpdateSubject(subject: Subject): void{
    this.selectedSubject = subject;
		this.selectedAssignment = null;
		this.selectedAssignmentItem = null;
  }

  getAdminMySubjectList(id: string): void {
    this.apiService.getAdminMySubjects(id).subscribe(
      subjects => this.subjects = subjects,
      error => this.subjects = <any>error);
  }

  createSubject(subject: Subject) {
    this.apiService.createSubject(subject).subscribe(
      subjects => this.subjects = subjects,
      error => this.subjects = <any>error);
  }

  updateSubject(subjectObjId: String, subject: Subject) {
    this.apiService.updateSubject(subjectObjId, subject);
  }

  createAssignment(subjectObjId: String, assignment: Assignment) {
    this.apiService.createAssignment(subjectObjId, assignment);
  }

  updateAssignment(subjectObjId: string, assignment: Assignment) {
    this.apiService.updateAssignment(subjectObjId, assignment);
  }

  createAssignmentItem(subjectObjId: String, assignmentObjId: String, assignmentItem: AssignmentItem) {
    this.apiService.createAssignmentItem(subjectObjId, assignmentObjId, assignmentItem);
  }

  updateAssignmentItem(subjectObjId: String, assignmentObjId: String, assignmentItem: AssignmentItem) {
    this.apiService.updateAssignmentItem(subjectObjId, assignmentObjId, assignmentItem);
  }

  addTeacher(subjectId: String, teacherId: String) {
    this.apiService.addTeacherOfSubject(subjectId, teacherId);
  }

  removeTeacher(subjectId: String, teacherId: String) {
    this.apiService.removeTeacherOfSubject(subjectId, teacherId);
  }

  addAssistantsOfSubject(subjectId: String, assistantId: String): void {
    console.log("still in progress");
  }

  removeAssistantsOfSubject(subjectId: String, assistantId: String): void {
    console.log("still in progress");
  }

  updateStudentsOfSubject(subjectId: string): void {
    this.apiService.updateStudentsOfSubject(subjectId, ReplaceTextToJsonArray(this.studentList));
  }
}
*/