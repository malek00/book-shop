import {
  HttpClient,
  HttpErrorResponse, 
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    //
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          let user = new User(
            data.email,
            data.localId,
            data.idToken,
            expirationDate
          );
          this.user.next(user);
          this.autoLogout(+data.expiresIn * 1000);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    if(this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          const expirationDate = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          let user = new User(
            data.email,
            data.localId,
            data.idToken,
            expirationDate
          );
          this.user.next(user);
          this.autoLogout(+data.expiresIn * 1000);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorRes.error.error.message);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This Email DOES NOT Exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong PASSWORD';
        break;
    }
    return throwError(errorMessage);
  }
  autoLogin() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    } else {
      const loaded = JSON.parse(user);
      console.log(loaded);
      this.user.next(
        new User(
          loaded.email,
          loaded.id,
          loaded._token,
          loaded._tokenExpirationDate
        )
      );
    }
  }
  autoLogout(expirationduration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationduration);
  }
}
