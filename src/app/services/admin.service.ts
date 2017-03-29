import { Injectable } from '@angular/core';
import { Subject as SubjectRxjs } from 'rxjs';
import { Subject, Assignment, AssignmentItem } from '../models';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable()
export class AdminService {
	private adminSubjectsSource = new SubjectRxjs<any>();
	private adminSelectedSubjectSource = new SubjectRxjs<any>();
	private adminSelectedAssignmentSource = new SubjectRxjs<any>();
	private adminSelectedAssignmentItemSource = new SubjectRxjs<any>();
	private subjects: Subject[];

	adminSubjects$ = this.adminSubjectsSource.asObservable();
	adminSelectedSubject$ = this.adminSelectedSubjectSource.asObservable();
	adminSelectedAssignment$ = this.adminSelectedAssignmentSource.asObservable();
	adminSelectedAssignmentItem$ = this.adminSelectedAssignmentItemSource.asObservable();


	constructor(
		private authService: AuthService,
		private apiService: ApiService){
	}

	getAdminMySubjects(userId: string) {
    this.apiService.getAdminMySubjects(userId)
			.subscribe(
				subjects => this.subjects = subjects
			);
  }

	onUpdatedSubjects(subjects: Subject[]) {
		this.adminSubjectsSource.next(subjects);
	}

	onSelectedSubject(subject: Subject) {
		this.adminSelectedSubjectSource.next(subject);
	}

	onSelectedAssignment(assignment: Assignment) {
		this.adminSelectedAssignmentSource.next(assignment);
	}

	onSelectedAssignmentItem(assignmentItem: AssignmentItem) {
		this.adminSelectedAssignmentItemSource.next(assignmentItem);

	}

}