import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Service } from "src/app/models/Service";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Services } from "src/app/services/services.service";
import { TourService } from "src/app/services/tour.service";
import { Tour } from "src/app/models/Tour";
import { HttpErrorResponse } from "@angular/common/http";
import { Rates } from "src/app/models/Rates";

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
  rates: Rates;
  showRelatedLoadingInfo: boolean = true;
  showLoadingRatesInfo: boolean = true;

  carouselOptions = {
    margin: 25,
    nav: true,
    navText: [
      "<div class='nav-btn prev-slide'></div>",
      "<div class='nav-btn next-slide'></div>"
    ],
    responsiveClass: true,
    // responsive: {
    //   0: {
    //     items: 1,
    //     nav: true,
    //     loop: true
    //   },
    //   600: {
    //     items: 1,
    //     nav: true,
    //     loop: true
    //   },
    //   1000: {
    //     items: 2,
    //     nav: true,
    //     loop: true
    //   },
    //   1500: {
    //     items: 3,
    //     nav: true,
    //     loop: true
    //   }
    // }
  };

  public mode: string = "horizontal";
  constructor(
    private _tours: Services,
    private route: ActivatedRoute,
    private _router: Router,
    private _dialog: DialogManagerService,
    private _tour: TourService
  ) {}

  ngOnInit() {
    window.innerWidth < 700
      ? (this.mode = "vertical")
      : (this.mode = "horizontal");
    let id_service = this.route.snapshot.paramMap.get("id_service");
    if (
      this.route.snapshot.paramMap.get("id_service") &&
      this._tours.services
    ) {
      this.tour = this._tours.services.find(
        t => t.id_service === Number(id_service)
      );
      this.getServiceRates(Number(id_service));
      // get related tours
      this.handleGetRelatedToursSubscription(Number(id_service));
    } else this._router.navigateByUrl("/general/tours");
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    window.innerWidth < 700
      ? (this.mode = "vertical")
      : (this.mode = "horizontal");
  }

  getServiceRates(id_service: number) {
    this._tours.getServiceRates(id_service).subscribe({
      next: rates => {
        this.rates = rates;
        this.rates === null
          ? (this.showLoadingRatesInfo = false)
          : (this.showLoadingRatesInfo = true);
      },
      error: (err: HttpErrorResponse) => this._tours.handleError(err)
    });
  }

  handleGetRelatedToursSubscription(id_service: number) {
    this._tour.getRelatedTours(id_service).subscribe(
      related_tours => {
        this.relatedTours = related_tours;
        console.log(this.relatedTours);
        if (this.relatedTours.length === 0) this.showRelatedLoadingInfo = false;
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
