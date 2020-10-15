import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService, SpinnerService } from '@app-services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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
}
