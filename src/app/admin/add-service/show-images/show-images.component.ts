import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { AngularFireStorage } from "angularfire2/storage";
import { Subscription } from "rxjs";
import { CommonService } from "src/app/services/common.service";
import { ImageService } from "src/app/services/image.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-show-images",
  templateUrl: "./show-images.component.html",
  styleUrls: ["./show-images.component.scss"]
})
export class ShowImagesComponent implements OnInit {
  subscription: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fireStorage: AngularFireStorage,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<ShowImagesComponent>,
    private _common: CommonService,
    private _images: ImageService
  ) {}

  ngOnInit() {
    this.data.images = this._common.setImgsLazyLoading(this.data.images);
  }

  deleteImage(event: any) {
    console.log(event);
    this.fireStorage.storage
      .refFromURL(this.data.images[event.index].img)
      .delete()
      .then(() => {
        this.data.table === "service"
          ? this._images
              .deleteServiceImage(this.data.images[event.index].img)
              .subscribe({
                next: () =>
                  this._common.openSnackBar(
                    "Imagen eliminada de la base de datos",
                    "Ok",
                    2500
                  ),
                error: (err: HttpErrorResponse) => console.log(err)
              })
          : this._images
              .deleteTourImage(this.data.images[event.index].img)
              .subscribe({
                next: () =>
                  this._common.openSnackBar(
                    "Imagen eliminada de la base de datos",
                    "Ok",
                    2500
                  ),
                error: (err: HttpErrorResponse) => console.log(err)
              });
        this.snackbar.open("Imagen eliminada", "Ok", { duration: 2000 });
        this.data.images.splice(event.index, 1);
      })
      .catch(err => console.log(JSON.stringify(err)));
  }

  onNoClick(): void {
    return this.dialogRef.close(this.data.images);
  }
}
