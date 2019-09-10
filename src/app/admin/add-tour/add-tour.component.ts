import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DialogManagerService } from "src/app/services/dialog-manager.service";
import { Tour } from "src/app/models/Tour";
import { TourService } from "src/app/services/tour.service";
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/User';

@Component({
  selector: "app-add-tour",
  templateUrl: "./add-tour.component.html",
  styleUrls: ["./add-tour.component.scss"]
})
export class AddTourComponent implements OnInit {
  tourFG: FormGroup;
  phones = { phones: [] };
  related: any; // servicio relacionado
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

  constructor(
    private _fb: FormBuilder,
    private _dialog: DialogManagerService,
    private _tour: TourService,
    private storage: AngularFireStorage,
  ) {
    this.tourFG = this._fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      phone: [""],
      email: ["", Validators.required]
    });
  }

  ngOnInit() {}

  addPhone(phone) {
    this.phones.phones.unshift(phone);
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
    let tour = new Tour(
      this.tourFG.get("name").value,
      this.tourFG.get("description").value,
      JSON.stringify(this.phones),
      this.downloadURLS,
      this.tourFG.get("email").value,
      (JSON.parse(
        localStorage.getItem(`${environment.localstorage_key}`)
      ) as User).id,
      this.related !== undefined ? this.related.id : null
    );
    this._tour.saveTour(tour);
  }

  getRelated() {
    this._dialog.getRelated().subscribe(related => (this.related = related));
  }
}
