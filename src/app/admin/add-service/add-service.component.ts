import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AngularFireUploadTask,
  AngularFireStorage
} from "angularfire2/storage";
import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Service } from "src/app/models/Service";
import { ToursService } from "src/app/services/tours.service";

@Component({
  selector: "app-add-service",
  templateUrl: "./add-service.component.html",
  styleUrls: ["./add-service.component.scss"]
})
export class AddServiceComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  classification: Array<string> = ["Tour", "Comida", "Arte y Cultura", "Otro"];
  addServiceFG: FormGroup;
  files: FileList;

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURLS: Array<string> = [];

  location: JSON;

  // State for dropzone CSS toggling
  isHovering: boolean;
  constructor(
    private storage: AngularFireStorage,
    private _fb: FormBuilder,
    private _dialog: DialogManagerService,
    private _tour: ToursService
  ) {
    this.addServiceFG = this._fb.group({
      name: ["", Validators.required],
      classification: ["", Validators.required],
      additional_info: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  ngOnInit() {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  prepareFiles(event: FileList) {
    this.files = event;
    console.log(event)
    //this.upload(Array.from(event));
  }

  startUpload() {
    this.upload(Array.from(this.files));
  }

  openShowImages() {
    this._dialog.openImagesDialog(this.downloadURLS).subscribe(imgs => this.downloadURLS = imgs);
  }

  upload(files) {
    if (files.length === 0) {
      this.percentage = undefined;
      return;
    }
    //console.log(files[0])
    // Client-side validation example
    /*if (file.type.split("/")[0] !== "image") {
      console.error("unsupported file type :( ");
      return;
    }*/

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
            .subscribe(url => this.downloadURLS.push(url));
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

  onSubmit() {
    this.subscription = this._tour
      .saveService(
        new Service(
          JSON.stringify(this.location),
          this.addServiceFG.get("name").value,
          this.addServiceFG.get("classification").value,
          this.addServiceFG.get("additional_info").value,
          this.addServiceFG.get("phone").value,
          this.addServiceFG.get("email").value,
          this.downloadURLS
        )
      )
      .subscribe(() => {
        this._tour.openSnackBar("Servicio guardado correctamente", "Ok", 2500);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pickLocation() {
    this._dialog
      .openPickLocationDialog()
      .subscribe(location => (this.location = location));
  }
}
