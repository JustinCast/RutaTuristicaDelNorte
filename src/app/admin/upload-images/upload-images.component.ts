import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "angularfire2/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { DialogManagerService } from "src/app/services/dialog-manager.service";

@Component({
  selector: "app-upload-images",
  templateUrl: "./upload-images.component.html",
  styleUrls: ["./upload-images.component.scss"]
})
export class UploadImagesComponent implements OnInit {
  files: FileList;

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURLS: Array<string> = [];

  // State for dropzone CSS toggling
  isHovering: boolean;

  @Output() downloadUrlsChange = new EventEmitter();

  constructor(
    private _dialog: DialogManagerService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  openShowImages() {
    this._dialog.openImagesDialog(this.downloadURLS);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  prepareFiles(event: FileList) {
    this.files = event;
  }

  startUpload() {
    this.upload(Array.from(this.files));
  }

  upload(files) {
    if (files.length === 0) {
      this.percentage = undefined;
      return;
    }

    // The storage path
    const path = `${new Date().getTime()}_${files[0].name}`;

    // Totally optional metadata
    const customMetadata = { app: "Ruta Turistica del norte" };

    // The main task
    this.task = this.storage.upload(path, files[0], { customMetadata });
    this.percentage = this.task.percentageChanges();
    this.task
      .then(() => {
        files.splice(0, 1);
        this.upload(files);
      })
      .catch(err => console.error(err));

    // Progress monitoring
    this.snapshot = this.task.snapshotChanges();

    // The file's download URL
    this.snapshot
      .pipe(
        finalize(() => {
          this.storage
            .ref(path)
            .getDownloadURL()
            .subscribe(url => {
              this.downloadUrlsChange.emit(url);
              this.downloadURLS.push(url);
            });
        })
      )
      .subscribe();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === "running" &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
