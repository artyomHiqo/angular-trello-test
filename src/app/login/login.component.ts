import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app-services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private router: Router;
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
    this.router.navigateByUrl('/dashboards');
    console.log(response);
  }

  async signUp(): Promise<void> {
    const response = await this.authService.signUp(this.email, this.name, this.password);
    console.log(response);
  }

  ngOnInit(): void {
  }

}
