import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./general-root.component.scss']
})
export class GeneralRootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
