import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { APIUrl } from '../constants';
import { getError } from '../utils/auth-errors';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options: {
    headers: HttpHeaders;
  };

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token') || '';
    this.options = {
      headers: new HttpHeaders({
        authorization: token
      })
    };
  }

  setToken(token: string): void {
    this.options.headers.set('authorization', token);
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  postWithoutToken<T>(path: string, body: any): Promise<T> {
    return this.http.post(`${APIUrl}/${path}`, body)
      .pipe(
        catchError(this.handleError),
        map((response: any) => {
        if (response.success && response.data.token) {
          this.setToken(response.data.token);
        }
        return response.data as T;
      }))
      .toPromise();
  }

  post<T>(path: string, body: any): Promise<T> {
    return this.http.post(`${APIUrl}/${path}`, body, this.options)
      .pipe(map((response: any) => response.data as T))
      .toPromise();
  }

  get<T>(path: string): Promise<T> {
    return this.http.get(`${APIUrl}/${path}`, this.options)
      .pipe(map((response: any) => response.data as T))
      .toPromise();
  }

  private handleError(error: HttpErrorResponse): Observable<Error> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error);
    }
    return throwError(getError(error.error.message));
  }
}
