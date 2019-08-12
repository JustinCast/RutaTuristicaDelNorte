import { Component, OnInit } from "@angular/core";
import { Services } from "src/app/services/services.service";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-search-related",
  templateUrl: "./search-related.component.html",
  styleUrls: ["./search-related.component.scss"]
})
export class SearchRelatedComponent implements OnInit {
  results: Array<any>;
  selected: any;
  constructor(
    private _service: Services,
    public dialogRef: MatDialogRef<SearchRelatedComponent>
  ) {}

  ngOnInit() {}

  search(name: string) {
    this._service
      .getServiceNameId(name)
      .subscribe(data => (this.results = data));
  }

  handleSelectedOpClick(checked) {
    if (checked) this.selected = undefined;
  }

  closeSearch() {
    this.dialogRef.close(this.selected);
  }
}
