import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
  encapsulation: ViewEncapsulation.None 
})
export class CarouselComponent implements OnInit {
  @Input() public data: any;
  @Input() public allowDelete: boolean;
  @Output() deleteImageEvent = new EventEmitter();

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
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      },
      1500: {
        items: 1,
        nav: true,
        loop: false
      }
    }
  };

  constructor() {}

  ngOnInit() {}

  emitImageDeletion(index: number) {
    this.deleteImageEvent.emit({ index: index, table: this.data.table });
  }
}
