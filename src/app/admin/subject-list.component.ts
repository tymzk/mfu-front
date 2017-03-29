import { Component, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';

import { Subject } from '../models';

@Component({
  selector: 'app-admin-subject-list',
  templateUrl: './subject-list.component.html'
})

export class AdminSubjectListComponent implements OnDestroy {
  private subjects: Subject[];
  selectedSubject: Subject;
  subSubjects: Subscription;

  constructor(private adminService: AdminService) {
    this.subSubjects = this.adminService.adminSubjects$.subscribe(
      subjects => {
        this.subjects = subjects;
      }
    );

  }

  onSelectSubject(subject: Subject): void {
    this.selectedSubject = subject;
    this.adminService.onSelectedSubject(subject);
  }
	ngOnDestroy() {
    this.subSubjects.unsubscribe();
	}

}
