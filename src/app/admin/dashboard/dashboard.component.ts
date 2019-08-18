import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Service } from 'src/app/models/Service';
import { DialogManagerService } from 'src/app/services/dialog-manager.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  services: Array<Service>;
  tours: Array<any>;  
  constructor(
    private _user: UserService,
    private _dialog: DialogManagerService
  ) {}

  ngOnInit() {
    this._user
      .getServicesByUser()
      .subscribe(
        data => this.services = data,
        (err: HttpErrorResponse) => this._user.handleError(err)
      );
  }

  editService(i: number): void {
    this._dialog.openEditServiceDialog(this.services[i].id_service);
  }
}
