import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { Subject, Person, Assignment, AssignmentItem } from '../models';

@Component({
  selector: 'app-admin-subject-management',
  template: `
<
<md-card>

  <md-card-title-group>
    <md-card-title>担当講義</md-card-title>
  </md-card-title-group>

  <md-card-content>

    <md-list dense class="subjects">
      <md-list-item *ngFor="let subject of subjects; let i=index"
        [class.selected]="subject === selectedSubject">
        <md-icon md-list-avatar>school</md-icon>
        <h4 md-line>{{subject.name}}</h4>
        <md-checkbox [(ngModel)]="subject.private">公開</md-checkbox>
        <button md-raised-button (click)="onSelectSubject(subject)" color="primary">詳細</button>
      </md-list-item>
    </md-list>

  </md-card-content>

</md-card>
<app-admin-update-subject
  [id]="id"
  [subjects]="subjects"
  [selectedSubject]="selectedSubject">
</app-admin-update-subject>

<router-outlet></router-outlet>
`,
  styleUrls: ['./admin.component.css'],
  providers: [ ApiService ]
})

export class AdminSubjectManagementComponent implements OnInit {
  id: string;
  selectedSubject: Subject;
  subjects: Subject[];

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    console.log(this.authService.isAuthenticated());
  }

  ngOnInit() {
    this.id = this.authService.getId();
    this.getAdminMySubjectList(this.id);
  }

  getAdminMySubjectList(id: string): void {
    this.apiService.getAdminMySubjects(id).subscribe(
      subjects => this.subjects = subjects,
      error => this.subjects = <any>error);
  }

  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
//		this.selectedUpdateSubject = null;
//		this.selectedAssignment = null;
//		this.selectedAssignmentItem = null;
  }

}
