import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app-services/auth.service';
import { SpinnerService } from '@app-services/spinner.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showSpinner$: Observable<boolean>;
  logIn = true;
  errors: string[];

  constructor(
    private authService: AuthService,
    private spinner: SpinnerService,
  ) {
    this.showSpinner$ = spinner.getValue();
  }

  changeActivity(isLogin): void {
    this.logIn = isLogin;
  }

  ngOnInit(): void {
  }
}
