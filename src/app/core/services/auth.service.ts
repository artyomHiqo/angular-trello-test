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
  public isAuthorizedSubject = new BehaviorSubject<boolean>(undefined);

  constructor(
    http: HttpClient,
    ) {
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

  async signIn(data: User): Promise<User> {
    const { user } = await this.postWithoutToken('auth/signin', data);
    this.isAuthorizedSubject.next(true);
    return this.user = user;
  }

  async signUp(data: User): Promise<User> {
    const { user } = await this.postWithoutToken('auth/signup', data);
    this.isAuthorizedSubject.next(true);
    return this.user = user;
  }

  logOut(): void {
    this.clearToken();
    this.isAuthorizedSubject.next(false);
  }
}
