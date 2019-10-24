import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(private _http: HttpClient) {}

  deleteTourImage(img: String): Observable<any> {
    return this._http.post<any>(
      `${environment.SERVER_BASE_URL}deleteTourImage`,
      {
        img: img
      }
    );
  }

  deleteServiceImage(img: String): Observable<any> {
    return this._http.post<any>(
      `${environment.SERVER_BASE_URL}deleteServiceImage`,
      {
        img: img
      }
    );
  }
}
