import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  logIn = true;
  email: string;
  login: string;
  password: string;

  constructor(private authService: AuthService) {

  }

  changeActivity(isLogin): void {
    this.logIn = isLogin;
    // this.authService.two()
  }
}
