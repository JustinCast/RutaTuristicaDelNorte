import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public _http: HttpClient) {}

  login(user: User): void {
    localStorage.setItem(`${environment.localstorage_key}`, JSON.stringify(user));
  }

  logout(): any {
    localStorage.removeItem(`${environment.localstorage_key}`);
  }

  getUser(): any {
    return localStorage.getItem(`${environment.localstorage_key}`);
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];