import { Injectable } from "@angular/core";
import { Service } from "../models/Service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MatSnackBar } from "@angular/material";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { Rates } from "../models/Rates";
import { CommonService } from './common.service';

@Injectable({
  providedIn: "root"
})
export class Services {
  public services: Array<Service>;
  public page: number;
  limit: number = 6;
  offset: number = 0;
  count: number;
  constructor(private _http: HttpClient, private _snackbar: MatSnackBar, private _common: CommonService) {}

  getServicesCount(column: String, value: String): Observable<number> {
    return this._http.get<number>(
      `${environment.SERVER_BASE_URL}getServicesCount?column=${column}&value=${value}`
    );
  }

  saveService(service: Service): Observable<any> {
    return this._http.post(`${environment.SERVER_BASE_URL}saveService`, {
      service: service,
      _id_user: (JSON.parse(
        localStorage.getItem(`${environment.localstorage_key}`)
      ) as User).id
    });
  }

  deleteService(id_service: number) {
    return this._http.delete(`${environment.SERVER_BASE_URL}deleteService/${id_service}`);
  }

  updateService(updatedService: Service) {
    this._http
      .put(`${environment.SERVER_BASE_URL}updateService`, updatedService)
      .subscribe({
        next: () => this.openSnackBar("Servicio actualizado", "Ok", 2500),
        error: (err: HttpErrorResponse) => this.handleError(err)
      });
  }

  getServiceRates(id_service: number): Observable<Rates> {
    return this._http.get<Rates>(
      `${environment.SERVER_BASE_URL}getServiceRates/${id_service}`
    );
  }

  getServices(limit: number, offset: number, filter: string) {
    this._http
      .get<Array<Service>>(
        `${environment.SERVER_BASE_URL}getServices?limit=${limit}&offset=${offset}&filter=${filter}`
      )
      .subscribe(
        services => {
          this.services = services;
          this.setLazyLoading();
        },
        (err: HttpErrorResponse) => this.handleError(err)
      );
  }

  getServiceImages(id_service: number): Observable<Array<string>> {
    return this._http.get<any>(`${environment.SERVER_BASE_URL}getServiceImages/${id_service}`);
  }

  setLazyLoading(): void {
    this.services.forEach(t => (t._imgs_lazy = this._common.setImgsLazyLoading(t.imgs)));
  }

  getService(id_service: number): Observable<Service> {
    return this._http.get<Service>(
      `${environment.SERVER_BASE_URL}getService/${id_service}`
    );
  }

  getServiceNameId(name: string): Observable<any> {
    let user_id = (JSON.parse(
      localStorage.getItem(`${environment.localstorage_key}`)
    ) as User).id;
    return this._http.get<any>(
      `${environment.SERVER_BASE_URL}getServiceNameId/${name}/${user_id}`
    );
  }

  getServicesNames(): Observable<any[]> {
    let user_id = (JSON.parse(
      localStorage.getItem(`${environment.localstorage_key}`)
    ) as User).id;
    return this._http.get<any[]>(
      `${environment.SERVER_BASE_URL}getServiceNames/${user_id}`
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackbar.open(message, action, {
      duration: duration
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
