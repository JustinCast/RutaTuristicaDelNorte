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
    this.images = [
      "https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567636256489_IMG_3152.JPG?alt=media&token=505db4c6-fdbd-45b8-87e1-40d5fc3e7b75",
      "https://firebasestorage.googleapis.com/v0/b/ruta-turistica-del-norte.appspot.com/o/1567617430575_5e0f2dce-0c27-4627-a205-37d6c6935364.jpeg?alt=media&token=fb103906-9c15-4169-8b73-3c79a5882aaf"
    ]; //this._common.setImgsLazyLoading(this.images);
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
    this.subscription.unsubscribe();
  }
}
