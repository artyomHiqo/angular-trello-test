import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logIn = true;
  email: string;
  name: string;
  password: string;

  constructor(private authService: AuthService) { }

  changeActivity(isLogin): void {
    this.logIn = isLogin;
  }

  async signIn(): Promise<void> {
    const response = await this.authService.signIn(this.email, this.password);
    console.log(response);
  }

  async signUp(): Promise<void> {
    const response = await this.authService.signUp(this.email, this.name, this.password);
    console.log(response);
  }

  validateForm(event) {
    event.preventDefault();

  }

  async submitForm(data) {
    try {
    } catch (error) {
    }
  }

  ngOnInit(): void {
  }

}
