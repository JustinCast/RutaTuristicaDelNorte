import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Service } from 'src/app/models/Service';
import { Services } from 'src/app/services/services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.scss']
})
export class EditServiceDialogComponent implements OnInit {
  s: any;
  constructor(
    public dialogRef: MatDialogRef<EditServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id_service: number,
    private _sevice: Services,
    private _common: CommonService
  ) { }

  ngOnInit() {
    this._sevice.getService(this.id_service)
    .subscribe(
      service => {this.s = service; console.log(this.s)},
      (err: HttpErrorResponse) => this._sevice.handleError(err)
    );
  }

  onNoClick(): void {
    return this.dialogRef.close();
  }

  onSubmit() {
    return this.dialogRef.close(this.s);
  }

}
