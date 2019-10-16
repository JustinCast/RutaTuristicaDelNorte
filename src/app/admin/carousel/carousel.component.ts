import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements OnInit {

  @Input() images: Array<any>;

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

  constructor() {}

  ngOnInit() {}
}
