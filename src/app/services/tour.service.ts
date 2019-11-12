import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { Tour } from "../models/Tour";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class TourService {
  limit: number = 6;
  toursOffset: number = 0;
  toursPage: number = 1;
  count: number;

  constructor(private _http: HttpClient, private _snackbar: MatSnackBar) {}

  getTours(limit: number, offset: number): Observable<Array<Tour>> {
    return this._http.get<Array<Tour>>(
      `${environment.SERVER_BASE_URL}getTours?limit=${limit}&offset=${offset}`
    );
  }

  getTableToursCount() {
    this._http
      .get<any>(`${environment.SERVER_BASE_URL}getTableToursCount`)
      .subscribe({
        next: count => (this.count = Number(count)),
        error: (err: HttpErrorResponse) => this.handleError(err),
      });
  }

  saveTour(tour: Tour): Observable<any> {
    return this._http.post(`${environment.SERVER_BASE_URL}saveTour`, tour);
  }

  deleteTour(id_tour: number) {
    return this._http.delete(
      `${environment.SERVER_BASE_URL}deleteTour/${id_tour}`
    );
  }

  getTour(id_tour: number): Observable<Tour> {
    return this._http.get<Tour>(
      `${environment.SERVER_BASE_URL}getTour/${id_tour}`
    );
  }

  updateTour(tour: any): Observable<any> {
    return this._http.put(
      `${environment.SERVER_BASE_URL}updateTour/${tour.id}`,
      tour
    );
  }

  getTourImages(id_tour: number): Observable<any> {
    return this._http.get<any>(
      `${environment.SERVER_BASE_URL}getTourImages/${id_tour}`
    );
  }

  setLazyLoading(tours: Array<Tour>): void {
    tours.forEach(t => (t._imgs_lazy = this.setImgsLazyLoading(t.imgs)));
  }

  getTourAdditionalInfo(id_tour: number): Observable<any> {
    return this._http.get(`${environment.SERVER_BASE_URL}getTourAdditionalInfo/${id_tour}`);
  }

  public setImgsLazyLoading(imgs): Array<any> {
    let aux = [];
    imgs.forEach(img => {
      aux.unshift({ img: img, show: false });
    });
    return aux;
  }

  deleteRelatedService(): Observable<any> {
    return this._http.get(`${environment.SERVER_BASE_URL}deleteRelatedService`);
  }

  deleteRates(id_tour: number): Observable<any> {
    return this._http.delete(`${environment.SERVER_BASE_URL}deleteRates/${id_tour}`);
  }

  /**
   * Get all related tours when open a specific service
   * @param related_service
   */
  getRelatedTours(related_service: number): Observable<Array<Tour>> {
    return this._http.get<Array<Tour>>(
      `${environment.SERVER_BASE_URL}getRelatedTours/${related_service}`
    );
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
