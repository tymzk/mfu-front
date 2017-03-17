import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Subject, Person, Assignment, AssignmentItem } from '../models';
import { ReplaceTextToJsonArray, TextToJsonArrayPipe } from '../pipes/texttojsonarray.pipe';

@Component({
  selector: 'app-admin-update-subject',
  templateUrl: './updatesubject.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ ApiService ]
})
export class AdminUpdateSubjectComponent implements OnInit {

  addTeacherOfSubjectForm: FormGroup;
  createSubjectForm: FormGroup;
  assignmentForm: FormGroup;
	assignmentItemForm: FormGroup;
  teachersForm: FormGroup;
  selectedTeachersForm: FormGroup;
  private id: string;
  subjects: Subject[];
  teachers: Person[];
  selectedSubject: Subject;
  selectedUpdateSubject: Subject;
	selectedAssignment: Assignment;
	selectedAssignmentItem: AssignmentItem;
  selectedAssignmentDetails: Assignment;
  studentList: String;
  logCurrentValue(){

  }

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    console.log(this.authService.isAuthenticated());
  }
  getTeacherList(): void{

  }

  ngOnInit() {
    this.studentList = '';
    this.id = this.authService.getId();
    this.getAdminMySubjectList(this.id);
    this.getTeacherList();
    console.log("get my subjects" + this.id + this.subjects);

    this.createSubjectForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ] ],
      teachers: this.fb.array([ [
        this.id,
        Validators.required
      ] ]),
      semester: ['', [
      ] ]
    });

    this.selectedTeachersForm = this.fb.group({
      name: ['', [
          Validators.required,
          Validators.minLength(2)
      ] ],
      teachers: this.fb.array([
        '',
        Validators.required
      ])
    });

    this.assignmentForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ] ],
      valid: [false, [

      ] ],
      description: ['', [
      ] ],
      deadline: [new Date(2000, 1,1 ), [
      ] ]
    });

    this.addTeacherOfSubjectForm = this.fb.group(
      ['', [
        Validators.required,
        Validators.minLength(2)
      ] ]
    );

    this.teachersForm = this.fb.group({
      name: ['',
        [Validators.required,
        Validators.minLength(4)
      ] ],
      teachers: this.fb.array([
        '',
        Validators.required
      ])
    });
  }

  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
		this.selectedUpdateSubject = null;
		this.selectedAssignment = null;
		this.selectedAssignmentItem = null;
  }

  onSelectAssignment(assignment: Assignment): void {
		this.selectedAssignment = assignment;
		this.selectedAssignmentItem = null;
		this.selectedUpdateSubject = null;
  }

  onSelectAssignmentItem(assignmentItem: AssignmentItem): void {
		this.selectedAssignmentItem = assignmentItem;
		this.selectedUpdateSubject = null;
  }
  onSelectAssignmentDetails(assignment: Assignment){
    this.selectedAssignmentDetails = assignment;
		this.selectedAssignmentItem = null;
		this.selectedUpdateSubject = null;
  }

  onSelectUpdateSubject(subject: Subject): void{
    this.selectedSubject = subject;
    this.selectedUpdateSubject = subject;
		this.selectedAssignment = null;
		this.selectedAssignmentItem = null;
  }

  getAdminMySubjectList(id: string): void {
    console.log("get my subjects" + id + this.subjects);
    this.apiService.getAdminMySubjects(id).then(subjects => this.subjects = subjects);
  }

  createSubject(subject: Subject) {
    console.log(subject);
    this.apiService.createSubject(subject);
  }

  updateSubject(subjectObjId: String, subject: Subject) {
    console.log("still in progress");
    this.apiService.updateSubject(subjectObjId, subject);
  }

  createAssignment(subjectObjId: String, assignment: Assignment) {
    console.log(subjectObjId);
    console.log(assignment);
    this.apiService.createAssignment(subjectObjId, assignment);
  }

  updateAssignment() {
// buttyake itii ni kimatteru kara iran
    console.log(this.selectedSubject._id);
    console.log(this.selectedAssignment._id);
    this.apiService.updateAssignment(this.selectedSubject._id, this.selectedAssignment._id, this.selectedAssignment);
  }

  createAssignmentItem(subjectObjId: String, assignmentObjId: String, assignmentItem: AssignmentItem) {
// buttyake itii ni kimatteru kara iran
    console.log(subjectObjId);
    console.log(assignmentObjId);
    console.log(assignmentItem);
    this.apiService.createAssignmentItem(subjectObjId, assignmentObjId, assignmentItem);
  }

  updateAssignmentItem(subjectObjId: String, assignmentObjId: String, assignmentItemObjId: String, assignmentItem: AssignmentItem) {
// buttyake itii ni kimatteru kara iran
    console.log(subjectObjId);
    console.log(assignmentObjId);
    console.log(assignmentItemObjId);
    console.log(assignmentItem);
    this.apiService.updateAssignmentItem(subjectObjId, assignmentObjId, assignmentItemObjId, assignmentItem);
  }


  getSubjects() {
  }

  saveTeachers(value: any){
    console.log(value);
  }

  onClickTest(){
    console.log("onClickTest");
  }

  initTeachers() {
    return this.fb.group( [
      '',
      Validators.required,
      Validators.minLength(2)
    ] )
  }



  addTeacher(subjectId: String, teacherId: String) {
    console.log("teacher"+ teacherId);
    console.log("subject"+ subjectId);
    var jsontest = JSON.parse('{"_id":"' + subjectId +'", "id":"'+ teacherId +'"}');
//    this.apiService.addTeacherOfSubject(jsontest).then(subjects => this.subjects = subjects);
    console.log("still in progress");
  }

  removeTeacher(subjectId: String, teacherId: String) {
    console.log("teacher"+ teacherId);
    console.log("subject"+ subjectId);
    console.log("still in progress");
  }

  updateTeachersOfSubject(subjectId: String): void {
    console.log("still in progress");
  }

  updateAssistantsOfSubject(subjectId: String): void {
    console.log("still in progress");
  }

  updateStudentsOfSubject(subjectId: String): void {
    console.log(subjectId + " : " + ReplaceTextToJsonArray(this.studentList));
    this.apiService.updateStudentsOfSubject(subjectId, ReplaceTextToJsonArray(this.studentList));
  }
}
