import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {
  index: number;
  constructor(public _main: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.index = Number(this.route.snapshot.paramMap.get("id"));
  }

}
