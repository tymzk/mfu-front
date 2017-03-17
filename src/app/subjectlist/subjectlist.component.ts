import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/primeng';
import { Observable } from 'rxjs/Rx';
import { FileUploader } from 'ng2-file-upload';

import { Subject } from './subject';
import { Assignment } from './assignment';

import { Router} from '@angular/router';
const URL = 'https://localhost:3001/upload';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css'],
	providers: [ ApiService ]
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[];
  selectedSubject: Subject;
  selectedAssignment: Assignment;

  constructor(
    private apiService: ApiService) {

  }
  public uploader:FileUploader =
    new FileUploader({url:'http://localhost:3001/upload'});

  ngOnInit() {
    this.getSubjects();
  }


  getSubjects(): void {
    console.log("testtestse");
    this.apiService.getSubjects().then(subjects => this.subjects = subjects);
  }

  add(name: string): void {
  }

  delete(subject: Subject): void {
  }

  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
  }

  onSelectAssignment(assignment: Assignment): void {
    this.selectedAssignment = assignment;
  }

  gotoAssignments(): void {
    //this.router.navigate(['/detail', this.selectedSubject.id]);
  }
}
