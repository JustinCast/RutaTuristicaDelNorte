import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Service } from "src/app/models/Service";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Router } from "@angular/router";
import { Services } from "src/app/services/services.service";
import { CommonService } from "src/app/services/common.service";
import { TourService } from "src/app/services/tour.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  services: Array<Service>;
  tours: Array<any>;
  constructor(
    private _user: UserService,
    private _dialog: DialogManagerService,
    private _router: Router,
    private _service: Services,
    private _tour: TourService,
    private _common: CommonService
  ) {}

  ngOnInit() {
    this._user.getServicesByUser().subscribe(
      data => {
        this.services = data;
        this._user.getToursByUser().subscribe({
          next: data => {
            this.tours = data;
          },
          error: (err: HttpErrorResponse) => this._user.handleError(err),
        });
      },
      (err: HttpErrorResponse) => this._user.handleError(err)
    );
  }

  editService(i: number): void {
    if (this.services[i].id_service)
      this._router.navigate([
        "/admin/edit-service",
        this.services[i].id_service,
      ]);
    else this._user.openSnackBar("Ha ocurrido un error inesperado", "Ok", 2500);
  }

  deleteService(i: number) {
    this._service.deleteService(this.services[i].id_service).subscribe({
      next: () => {
        this._common.openSnackBar("Servicio eliminado con éxito", "Ok", 2500);
        this.services.splice(i, 1);
      },
      error: (err: HttpErrorResponse) => this._service.handleError(err),
    });
  }

  deleteTour(i: number) {
    this._tour.deleteTour(this.tours[i].id_tour).subscribe({
      next: () => {
        this._common.openSnackBar("Tour eliminado con éxito", "Ok", 2500);
        this.tours.splice(i, 1);
      },
      error: (err: HttpErrorResponse) => this._tour.handleError(err),
    });
  }

  editTour(i: number): void {
    if (this.tours[i].id_tour)
      this._router.navigate(["/admin/edit-tour", this.tours[i].id_tour]);
    else this._user.openSnackBar("Ha ocurrido un error inesperado", "Ok", 2500);
  }
}
