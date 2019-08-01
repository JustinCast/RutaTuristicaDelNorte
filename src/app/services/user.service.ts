import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { User } from "../models/User";
import { Observable } from "rxjs";

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

  openSnackBar(message: string, action: string, duration: number) {
    this._snackbar.open(message, action, {
      duration: duration
    });
  }

  getServicesAndToursByUser() {
    return this._http.get<any>(
      `${environment.SERVER_BASE_URL}getServicesAndToursByUser${
        (JSON.parse(
          localStorage.getItem(`${environment.localstorage_key}`)
        ) as User).id
      }`
    );
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
