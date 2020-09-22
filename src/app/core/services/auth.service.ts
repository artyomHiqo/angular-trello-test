import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from './api.service';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private user: User;
  private isAuthorizedSubject = new BehaviorSubject<boolean>(undefined);

  constructor(http: HttpClient) {
    super(http);
    const isAuthorized = !!localStorage.getItem('token');
    this.isAuthorizedSubject.next(isAuthorized);
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  getUser(): User {
    return this.user;
  }

  async signIn(email: string, password: string): Promise<User> {
    const body = {
      email,
      password,
    };
    const user = await this.postWithoutToken<User>('auth/signin', body);
    this.isAuthorizedSubject.next(true);
    return user;
  }

  async signUp(email: string, password: string, name: string): Promise<User> {
    const body = {
      email,
      password,
      name,
    };
    const user = await this.postWithoutToken<User>('auth/signup', body);
    this.isAuthorizedSubject.next(true);
    return user;
  }
}
