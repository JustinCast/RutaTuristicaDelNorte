import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatExpansionModule,
  MatCardModule,
  MatDialogModule,
  MatSnackBarModule,
  MatListModule,
  MatDividerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { CarouselModule } from "ngx-carousel-lib";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    CarouselModule,
    MatExpansionModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgbCarouselModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    CarouselModule,
    MatExpansionModule,
    NgxPaginationModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgbCarouselModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {}
