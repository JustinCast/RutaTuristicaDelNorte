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
export class ShowImagesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public images: Array<string>,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<ShowImagesComponent>,
    private _common: CommonService
  ) {}

  ngOnInit() {
    this.images = this._common.setImgsLazyLoading(this.images);
  }

  deleteImage(index: number) {
    /*this.subscription = */ this.storage
      .ref(this.images[index])
      .delete()
      .subscribe(
        () => {
          this.snackbar.open("Imagen eliminada", "Ok", { duration: 2000 });
          this.images.splice(index, 1);
        },
        err => {
          this.snackbar.open(
            `Hubo un error al eliminar la imagen, contacte a soporte`,
            "Ok",
            { duration: 2000 }
          );
          console.error(`Ha ocurrido un error ${JSON.stringify(err)}`);
        }
      );
  }

  onNoClick(): void {
    return this.dialogRef.close(this.images);
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
