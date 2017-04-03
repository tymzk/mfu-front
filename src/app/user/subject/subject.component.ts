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
  private id: string;
  private percent: string;
  subjects: Subject[];
  selectedSubject: Subject;
  selectedAssignment: Assignment;
  selectedAssignmentItem: AssignmentItem;
  filesToUpload: Array<File>;
  private submitted: SubmittedInfo[];

  uploadJsonData: String;

  constructor(
    private authService: AuthService,
    private apiService: ApiService) {
    this.filesToUpload = [];
    this.percent = "0";
  }

  ngOnInit() {
    this.getSubjects(this.authService.getId());
    this.id = this.authService.getId();
    console.log(this.subjects);
    this.submitted = [];
  }


  upload() {
//    this.makeFileRequest('http://localhost.co.jp:3001/upload',[],this.filesToUpload)
    this.makeFileRequest('http://localhost.co.jp:3001/upload',[],this.filesToUpload)
      .then(
        (result) => {
          this.checkSubmitted(this.id, this.selectedSubject._id, this.selectedAssignment._id);
        }, (error) => {
          console.log("error");
        }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var i = 1;

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

      xhr.upload.addEventListener("progress",
        (evt) => this.progressFunction(evt), false);

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
      this.checkSubmitted(this.id, this.selectedSubject._id, this.selectedAssignment._id);
    })
  }

  progressFunction(evt){
    if(evt.lengthComputable) {
      this.percent = Math.round(evt.loaded / evt.total * 100) + "%";
      console.log(Math.round(evt.loaded / evt.total * 100) + "%");
    }
  }


  getSubjects(userId: String): void {
    this.apiService.userGetSubjects(userId).subscribe(
      subjects => this.subjects = subjects
    );
  }


  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
    this.selectedAssignment = null;
    this.selectedAssignmentItem = null;
  }

  onSelectAssignment(assignment: Assignment): void {
    this.selectedAssignment = assignment;
    this.selectedAssignmentItem = null;
    this.checkSubmitted(this.id, this.selectedSubject._id, this.selectedAssignment._id);
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
