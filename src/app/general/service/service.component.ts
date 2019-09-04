import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/Service";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Services } from "src/app/services/services.service";
import { TourService } from "src/app/services/tour.service";
import { Tour } from "src/app/models/Tour";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-tour",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"]
})
export class TourComponent implements OnInit {
  tour: Service;
  public degree = 45;
  public moreSlides = 1;
  relatedTours: Array<Tour>;
  constructor(
    private _tours: Services,
    private route: ActivatedRoute,
    private _router: Router,
    private _dialog: DialogManagerService,
    private _tour: TourService
  ) {}

  ngOnInit() {
    let id_service = this.route.snapshot.paramMap.get("id_service");
    if (this.route.snapshot.paramMap.get("id_service") && this._tours.tours) {
      this.tour = this._tours.tours.find(
        t => t.id_service === Number(id_service)
      );
      console.log(this.tour);
      // get related tours
      this.handleGetRelatedToursSubscription(Number(id_service));
    } else this._router.navigateByUrl("/general/tours");
  }

  handleGetRelatedToursSubscription(id_service: number) {
    this._tour.getRelatedTours(id_service).subscribe(
      related_tours => {
        this.relatedTours = related_tours;
      },
      (err: HttpErrorResponse) => this._tour.handleError(err)
    );
  }

  showLoc() {
    let location = JSON.parse(this.tour._location);
    console.log(location);
    this._dialog.showTourLocation(
      {
        lat: location.lat,
        lng: location.lng
      },
      false
    );
  }
}
