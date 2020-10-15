import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, NotificationsService } from '@app-services/services';
import { User } from 'app/core/model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  reactiveForm: FormGroup;
  error: string;
  private isLogin = true;

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

  async onSubmit(): Promise<void> {
    const controls = this.reactiveForm.controls;

    if (this.reactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
    }

    try {
      if (this.isLogin) {
        await this.signIn();
      }
      this.router.navigate(['']);
    }
    catch (error) {
      this.notificationsService.openSnackBar(error.message, 'close');
    }
  }

  async signIn(): Promise<void> {
    const data = this.reactiveForm.value;
    await this.authService.signIn(data as User);
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

