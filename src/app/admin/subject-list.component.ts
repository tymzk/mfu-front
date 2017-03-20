import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

import { Subject } from '../models';

@Component({
  selector: 'app-admin-subject-list',
  templateUrl: './subject-list.component.html'
})

export class AdminSubjectListComponent {
  @Input() private subjects: Subject[];
  selectedSubject: Subject;

  constructor(private adminService: AdminService) {
  }

  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
    this.adminService.onSelectedSubject(subject);
  }

}
