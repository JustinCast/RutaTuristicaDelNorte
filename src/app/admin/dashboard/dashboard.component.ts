import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  toursAndServices: Array<any>;
  constructor(private _user: UserService) {}

  ngOnInit() {
    this._user
      .getServicesAndToursByUser()
      .subscribe(
        data => console.log(data),
        (err: HttpErrorResponse) => this._user.handleError(err)
      );
  }
}
