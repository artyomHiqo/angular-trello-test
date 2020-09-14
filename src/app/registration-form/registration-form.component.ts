import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {

  isActive = true;
  logIn = true;
  email = 'mail';

  constructor(private authService: AuthService) {

  }

  changeActivity(event) {

    if (event.target.getAttribute('data-tab') === '0') {
      console.log(1);
    } else {
      console.log(2);
    }

    // this.authService.two()


  }
}
