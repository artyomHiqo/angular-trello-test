import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app-services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logIn = true;
  errors: string[];

  constructor(
    private authService: AuthService,
  ) {}

  changeActivity(isLogin): void {
    this.logIn = isLogin;
  }

  ngOnInit(): void {
  }
}
