import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Subject, Assignment, AssignmentItem, SubmittedInfo } from '../../models';

import { Router} from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class UserSubjectComponent implements OnInit {
  subjects: Subject[];
  selectedSubject: Subject;
  selectedAssignment: Assignment;
  selectedAssignmentItem: AssignmentItem;
  filesToUpload: Array<File>;
  private submitted: SubmittedInfo[];


  upload() {
    this.makeFileRequest('http://localhost:3001/upload',[],this.filesToUpload)
      .then(
        (result) => {
          console.log("test")
        }, (error) => {
          console.log("error");
        }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++){
        formData.append("uploads", files[i], files[i].name);
      }

      var jsondata = JSON.stringify({
        userId: this.authService.getId(),
        alias: this.selectedAssignmentItem.alias,
        subjectName: this.selectedSubject.name,
        subjectObjectId: this.selectedSubject._id,
        assignmentName: this.selectedAssignment.name,
        assignmentObjectId: this.selectedAssignment._id,
        assignmentItemName: this.selectedAssignmentItem.name,
        assignmentItemObjectId: this.selectedAssignmentItem._id
      });

      formData.append('data', jsondata);

      xhr.upload.addEventListener("progress", (evt) => this.progressFunction(evt), false);

      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    })
  }

  progressFunction(evt){
    if(evt.lengthComputable) {
//      this.percent = Math.round(event.loaded / event.total * 100) + "%";
      console.log(Math.round(evt.loaded / evt.total * 100) + "%");
    }
  }

  uploadJsonData: String;

  constructor(
    private authService: AuthService,
    private apiService: ApiService) {
    this.filesToUpload = [];

  }

  ngOnInit() {
    this.getSubjects(this.authService.getId());
    console.log(this.authService.getId());
    console.log(this.subjects);
    this.submitted = [];
  }


  getSubjects(userId: String): void {
    this.apiService.userGetSubjects(userId)
      .then(subjects => this.subjects = subjects);
  }


  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
  }

  onSelectAssignment(assignment: Assignment): void {
    this.selectedAssignment = assignment;
    this.checkSubmitted('mf12061', this.selectedSubject._id, this.selectedAssignment._id);
  }

  onSelectAssignmentItem(assignmentItem: AssignmentItem): void {
    this.selectedAssignmentItem = assignmentItem;
  }

  checkSubmitted(userId: string, subjectObjId: string, assignmentObjId: string){
    this.apiService.userGetSubmittedInfo(userId, subjectObjId, assignmentObjId)
      .subscribe(data => {
        this.submitted = data;
        console.log(data);
      });
  }
  printSubmittedFileSize(assignmentItemObjId: string): number{
    // kuso mitaina code nanode naositai.
    for(var i = 0; i < this.submitted.length; i++){
      if(this.submitted[i]._id == assignmentItemObjId){
        return this.submitted[i].size;
      }
    }
  }
  printSubmittedDate(assignmentItemObjId: string): Date{
    // kuso mitaina code nanode naositai.
    for(var i = 0; i < this.submitted.length; i++){
      if(this.submitted[i]._id == assignmentItemObjId){
        return this.submitted[i].mtime;
      }
    }
  }
  isSubmittedItem(assignmentItemObjId: string): boolean {
    // kuso mitaina code nanode naositai.
    for(var i = 0; i < this.submitted.length; i++){
      if(this.submitted[i]._id == assignmentItemObjId){
        return true;
      }
    }
    return false;
  }
}
