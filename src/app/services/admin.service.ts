import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AdminService {
	private adminSelectedSubjectSource = new Subject<any>();
	private adminSelectedAssignmentSource = new Subject<any>();
	private adminSelectedAssignmentItemSource = new Subject<any>();

	adminSelectedSubject$ = this.adminSelectedSubjectSource.asObservable();
	adminSelectedAssignment$ = this.adminSelectedAssignmentSource.asObservable();
	adminSelectedAssignmentItem$ = this.adminSelectedAssignmentItemSource.asObservable();

	// masaka kaburutoha...
	onSelectedSubject(subject: any) {
		this.adminSelectedSubjectSource.next(subject);
	}

	onSelectedAssignment(assignment: any) {
		this.adminSelectedAssignmentSource.next(assignment);
	}

	onSelectedAssignmentItem(assignmentItem: any) {
		this.adminSelectedAssignmentItemSource.next(assignmentItem);

	}

}