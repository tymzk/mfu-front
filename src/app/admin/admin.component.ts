import { Component, Input, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ReplaceTextToJsonArray, TextToJsonArrayPipe } from '../pipes/texttojsonarray.pipe';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ ApiService ]
})
export class AdminComponent implements OnInit {

  private id: String;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    console.log(this.authService.isAuthenticated());
  }

  ngOnInit() {
    this.id = this.authService.getId();
  }
}
