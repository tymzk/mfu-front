import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Subject } from '../models';

@Component({
  selector: 'app-admin-subject-form',
  templateUrl: './subject-form.component.html'
})
export class AdminSubjectFormComponent {

  private id: string;
  private selectedSubject: Subject;

  constructor(
    private apiService: ApiService,
    private authService: AuthService) {
  }
//  createSubjectForm: FormGroup;

	subject = new Subject();
	submitted: boolean = false;

	onSubmit() {
		this.submitted = true;
	}

}
