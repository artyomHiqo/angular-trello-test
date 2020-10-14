import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app-services/auth.service';
import { NotificationsService } from '@app-services/notifications.service';

import { User } from 'app/core/model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  reactiveForm: FormGroup;
  currentError: string;

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private router: Router,
    private form: FormBuilder,
  ) {}

  isValid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];
    const result = control.invalid && control.touched;

    return result;
  }

  async onSubmit(event): Promise<void> {
    event.preventDefault();
    const controls = this.reactiveForm.controls;

    if (this.reactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
    }

    try {
      if (!this.isValid('password') && !this.isValid('email')) {
        await this.signUp();
      }
      this.router.navigate(['']);
    }
    catch (error) {
      this.notificationsService.openSnackBar(error.message, 'close');
    }
  }

  async signUp(): Promise<void> {
    const data = this.reactiveForm.value;
    await this.authService.signUp(data as User);
  }

  initForm(): void {
    const regExpMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    this.reactiveForm = this.form.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(regExpMail)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
