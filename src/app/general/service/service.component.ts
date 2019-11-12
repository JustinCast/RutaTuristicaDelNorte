import { Component, OnInit, HostListener, AfterViewInit } from "@angular/core";
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
export class ServiceComponent implements OnInit, AfterViewInit {
  service: Service;
  public moreSlides = 1;
  relatedTours: Array<Tour>;
  rates: Rates;
  showRelatedLoadingInfo: boolean = true;
  showLoadingRatesInfo: boolean = true;
  public data: any; // data to pass to carousel

  carouselOptions = {
    margin: 25,
    nav: true,
    navText: [
      "<div class='nav-btn prev-slide'></div>",
      "<div class='nav-btn next-slide'></div>"
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
        loop: true
      },
      600: {
        items: 1,
        nav: true,
        loop: true
      },
      1000: {
        items: 2,
        nav: true
      },
      1500: {
        items: 3,
        nav: true
      }
    }
  };

  public mode: string = "horizontal";
  constructor(
    private _service: Services,
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
      this._service.services
    ) {
      this.service = this._service.services.find(
        t => t.id_service === Number(id_service)
      );
      console.log(this.service);
      this.data = {images: this.service._imgs_lazy, table: "service"}
      this.getServiceRates(Number(id_service));
      // get related tours
      this.handleGetRelatedToursSubscription(Number(id_service));
    } else this._router.navigateByUrl("/general/tours");
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class
    let e = document.getElementsByTagName(
      "owl-carousel-child"
    )[0] as HTMLElement;
    if (e) {
      e.style.marginRight = "0px";
      e.style.marginLeft = "0px";
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    window.innerWidth < 700
      ? (this.mode = "vertical")
      : (this.mode = "horizontal");
  }

  getServiceRates(id_service: number) {
    this._service.getServiceRates(id_service).subscribe({
      next: rates => {
        this.rates = rates;
        this.rates === null
          ? (this.showLoadingRatesInfo = false)
          : (this.showLoadingRatesInfo = true);
      },
      error: (err: HttpErrorResponse) => this._service.handleError(err)
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

  openTourInfo(i: number) {
    this._tour.setLazyLoading(this.relatedTours);
    this._dialog.showTourInfo(this.relatedTours[i]);
  }

  showLoc() {
    let location = JSON.parse(this.service._location);
    this._dialog.showTourLocation(
      {
        lat: location.lat,
        lng: location.lng
      },
      false
    );
  }
}
