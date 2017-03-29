import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(private authService: AuthService) {
  }
}