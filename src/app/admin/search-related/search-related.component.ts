import { Component, OnInit } from "@angular/core";
import { Services } from "src/app/services/services.service";

@Component({
  selector: "app-search-related",
  templateUrl: "./search-related.component.html",
  styleUrls: ["./search-related.component.scss"]
})
export class SearchRelatedComponent implements OnInit {
  results: Array<any>;
  constructor(private _service: Services) {}

  ngOnInit() {}

  search(name: string) {
    this._service.getServiceNameId(name).subscribe(data => this.results = data);
  }
}
