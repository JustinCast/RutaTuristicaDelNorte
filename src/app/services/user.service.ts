import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { User } from "../models/User";
import { Observable } from "rxjs";
import { Service } from "../models/Service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private _http: HttpClient,
    private _snackbar: MatSnackBar,
    private _auth: AuthService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this._http.post<any>(`${environment.SERVER_BASE_URL}login`, {
      username: username,
      password: password
    });
  }

  passwordRecovery(username: string): Observable<any> {
    return this._http.get<any>(
      `${environment.SERVER_BASE_URL}passwordRecovery/${username}`
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackbar.open(message, action, {
      duration: duration
    });
  }

  getServicesByUser() {
    let id = (JSON.parse(
      localStorage.getItem(`${environment.localstorage_key}`)
    ) as User).id;
    return this._http.get<any>(
      `${environment.SERVER_BASE_URL}getServicesByUser/${id}`
    );
  }

  getToursByUser() {
    let id = (JSON.parse(
      localStorage.getItem(`${environment.localstorage_key}`)
    ) as User).id;
    return this._http.get<Array<Service>>(
      `${environment.SERVER_BASE_URL}getToursByUser/${id}`
    );
  }

  verifyCodeUsername(username: string, code: string, newPassword: string): Observable<any> {
    return this._http.post<any>(`${environment.SERVER_BASE_URL}verifyCodeUsername`, {
      username: username,
      code: code
    });
  }

  handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      // Error del lado del cliente
      console.log("An error occurred:", err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // Error del lado del backend
      console.log(
        `Backend returned code ${err.status}, body was: ${JSON.stringify(
          err.error
        )}`
      );
    }
  }
}
