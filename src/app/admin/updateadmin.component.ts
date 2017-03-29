import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Subject, Person } from '../models';

@Component({
  selector: 'app-admin-update-admin',
  templateUrl: './updateadmin.component.html'

})

export class AdminUpdateAdminComponent implements OnInit {
  inputAdminId: String;
  adminForm: FormGroup;
  admins: Person[];

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getAdminList();

    this.adminForm = this.fb.group({
      id : ['',
        [
          Validators.required
        ]
      ]
    });
  }
  getAdminList(): void {
    this.apiService.getAdminIds().subscribe(
      admins => this.admins = admins
    );
  }

  addAdmin(adminId: string){
    this.apiService.addAdmin(adminId).subscribe(
      admins => {
        this.getAdminList();
      }
    );
  }

  removeAdmin(id: String) {
    console.log("osuna " + id);
  }
}
