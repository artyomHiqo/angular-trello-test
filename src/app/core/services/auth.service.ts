import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { APIUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new BehaviorSubject<any>(null);

  public readonly user$ = this._user$.asObservable();

  constructor(private http: HttpClient) { }

  get user(): any {
    return this._user$.getValue();
  }

  signIn(email: string, password: string): Promise<any> {
    return this.http.post(`${APIUrl}/auth/singin`, {
      email,
      password
    }).toPromise();
  }

  signUp(email: string, name: string, password: string): Promise<any> {
    return this.http.post(`${APIUrl}/auth/singup`, {
      email,
      name,
      password
    }).toPromise();
  }
}
