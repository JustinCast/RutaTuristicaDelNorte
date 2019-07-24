import { Injectable } from '@angular/core';
import { Service } from '../models/Service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Services {
  public tours: Array<Service>;
  constructor(private _http: HttpClient, private _snackbar: MatSnackBar) { }

  saveService(service: Service): Observable<any> {
    return this._http.post(`${environment.SERVER_BASE_URL}saveService`, service);
  }

  getServices() {
    this._http.get<Array<Service>>(`${environment.SERVER_BASE_URL}getServices`)
    .subscribe(
      services => {
        this.tours = services;
      },
      (err: HttpErrorResponse) => this.handleError(err)
    )
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackbar.open(message, action, {
      duration: duration,
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
