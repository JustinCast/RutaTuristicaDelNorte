import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrls: ['./edit-service-dialog.component.scss']
})
export class EditServiceDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public s: Service
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    return this.dialogRef.close();
  }

  onSubmit() {
    return this.dialogRef.close(this.s);
  }

}
