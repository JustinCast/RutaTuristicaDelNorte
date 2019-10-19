import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { AngularFireStorage } from "angularfire2/storage";
import { Subscription } from "rxjs";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-show-images",
  templateUrl: "./show-images.component.html",
  styleUrls: ["./show-images.component.scss"]
})
export class ShowImagesComponent implements OnInit {
  subscription: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public images: Array<any>,
    private fireStorage: AngularFireStorage,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<ShowImagesComponent>,
    private _common: CommonService
  ) {}

  ngOnInit() {
    this.images = this._common.setImgsLazyLoading(this.images);
  }

  deleteImage(index: number) {
    this.fireStorage.storage
      .refFromURL(this.images[index].img)
      .delete()
      .then(() => {
        this.snackbar.open("Imagen eliminada", "Ok", { duration: 2000 });
        this.images.splice(index, 1);
      })
      .catch(err =>
        console.log(JSON.stringify(err))
      );
  }

  onNoClick(): void {
    return this.dialogRef.close(this.images);
  }
}
