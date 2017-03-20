import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Subject, Person } from '../models';

@Component({
  selector: 'app-admin-update-admin',
  templateUrl: './updateadmin.component.html',
  providers: [ ApiService ]
})

export class AdminUpdateAdminComponent implements OnInit {
  inputAdminId: String;
  addAdminForm: FormGroup;
  admins: Person[];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getAdminList();

    this.addAdminForm = this.fb.group({
      id : ['',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]
    });
  }

  getAdminList(): void {
    this.apiService.getAdminIds().then(admins => this.admins = admins);
  }

  addAdmin(admin: any){
    console.log("mada: " + admin);
  }

  removeAdmin(id: String) {
    console.log("osuna " + id);
  }
}
