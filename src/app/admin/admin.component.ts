import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Subject, Person } from '../subjectlist/subject';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ ApiService ]
})
export class AdminComponent implements OnInit {
//  @Input() userInfo: any;


  adminsForm: FormGroup;
  createSubjectForm: FormGroup;
  assignmentForm: FormGroup;
  teachersForm: FormGroup;
  private id: string;
  admins: Person[];
  subjects: Subject[];
  selectedSubject: Subject;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    console.log(this.authService.isAuthenticated());
    this.adminsForm = fb.group({
      id: String
    });
    this.createSubjectForm = fb.group({
      name : String
    });
  }

  ngOnInit() {
    this.id = this.authService.getId();
    this.getAdminMySubjects(this.id);
    this.getAdmins();
    console.log("get my subjects" + this.id + this.subjects);
    this.adminsForm = this.fb.group({
      admins: this.fb.array([
        this.fb.group({
          id: ['']
         })
      ])
    });

    this.createSubjectForm = this.fb.group({
      name: ['', [
          Validators.required,
          Validators.minLength(4)
      ] ],
      teachers: this.fb.array([
        this.fb.group({
          id: [this.id, Validators.required]
        })
      ])
    });
    this.teachersForm = this.fb.group({
      name: ['',
        [Validators.required,
        Validators.minLength(4)
      ] ],
      teachers: this.fb.array([
        this.initTeachers(),
      ])
    });
  }


  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
  }

  getAdmins(): void {
    this.apiService.getAdminIds().then(admins => this.admins = admins);
    console.log("getAdmins"+ this.admins);
  }

  addAdmin(id: String){
    console.log("mada" + id);
  }

  removeAdmin(id: String) {
    console.log("osuna " + id);
  }

  getAdminMySubjects(id: string): void {
    console.log("get my subjects" + id + this.subjects);
    this.apiService.getAdminMySubjects(id).then(subjects => this.subjects = subjects);
  }

  createSubject(value: any) {
    //console.log(value);
    this.apiService.createSubject(value);
  }

  getSubjects() {
    console.log(this.apiService.getSubjects());
  }

  saveTeachers(value: any){
    console.log(value);
  }

  initTeachers() {
    return this.fb.group({
      id: ['', Validators.required]
    })
  }

  addTeacher(form: any) {
    const control = <FormArray>form.controls['teachers'];
    control.push(this.initTeachers());
  }

  removeTeacher(i: number, form: any) {
    const control =  <FormArray>form.controls['teachers'];
    control.removeAt(i);
  }

  updateStudentsOfSubject(): void {
  }

  updateAssistantsOfSubject(): void {

  }
  updateTeachersOfSubject(): void {

  }
}
