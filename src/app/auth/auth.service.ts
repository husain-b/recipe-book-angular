import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { AuthComponent } from './auth.component';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';
import { Router } from '@angular/router';
import { LOCATION_INITIALIZED } from '@angular/common';
import { environment } from '../../environments/environment';
import { HtmlParser } from '@angular/compiler';

export interface AuthResponse {
  name: string;
  email: string;
  localId: string;
  idToken: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  @Output() onLogout = new Subject<boolean>();
  user = new BehaviorSubject<User>(null);
  logoutTimer: any;

  loginMode: boolean;

  // signUp(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponse>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  //         environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.errorHandler),
  //       tap((errRes) => {
  //         this.authenticationHandler(
  //           errRes.email,
  //           errRes.localId,
  //           errRes.idToken,
  //           +errRes.expiresIn
  //         );
  //       })
  //     );
  // }

  signUp(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.backendUrl}/users`, {
        name: name,
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticationHandler(
            resData.name,
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
          console.log(resData);
        })
      );
  }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponse>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //         environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.errorHandler),
  //       tap((errRes) => {
  //         this.authenticationHandler(
  //           errRes.email,
  //           errRes.localId,
  //           errRes.idToken,
  //           +errRes.expiresIn
  //         );
  //       })
  //     );
  // }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.backendUrl}/users/login`, {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticationHandler(
            resData.name,
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      name: string;
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.name,
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expireTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expireTime);
    }
  }

  logout() {
    this.http.post(`${environment.backendUrl}/users/logout`, {}).subscribe();
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }

  autoLogout(expireTime) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }

  private authenticationHandler(
    name: string,
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const exprireTime = new Date(new Date().getTime() + expiresIn);
    const user = new User(name, email, id, token, exprireTime);
    this.user.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorHandler(errRes: HttpErrorResponse) {
    console.log(errRes);
    let errMessage = 'An unknown error occured';
    if (errRes.status === 0) return throwError(errMessage);
    if (!errRes.error.error && !errRes.error.error.message) {
      return throwError(errMessage);
    } else {
      switch (errRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errMessage = 'Email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errMessage = 'Incorrect email or password';
          break;
        case 'INVALID_PASSWORD':
          errMessage = 'Incorrect email or password';
          break;
        case 'USER_DISABLED':
          errMessage = 'You are not allowed to Sign in!';
          break;
      }
      return throwError(errMessage);
    }
  }
}
